import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import About from "../pages/about";
import Home from "../pages/homepage";
import Shop from "../pages/shop";
import ProductDetails from "../pages/details";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Perfil from "../pages/profile";
import { CartContext } from "../components/cartcontext.js"; // Import CartContext
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/style.css";
import SignUpForm from "../pages/sign-up.js";
import LoginForm from "../pages/login.js";
import DetailedProfile from "../perfil.js";
import { AnimatePresence } from "framer-motion";
import Dashboard from "../dashboard/dashboard.js";
import OrderDetails from "../dashboard/pages/order-details.js";
import ProductsPage from "../dashboard/pages/products-page.js";
import Orders from "../dashboard/pages/orders.js";
import Clients from "../dashboard/pages/clients.js";

export default function Headers() {

  const location = useLocation();
  const { cartItems } = useContext(CartContext); // Use CartContext

  function Logout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }

  const getLoginId = localStorage.getItem("authToken");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="../animateka.png" className="logo" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Other navigation items */}
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/shop">
                    <img
                      src="http://animateka.co.mz/wp-content/uploads/2024/06/catalogo.png"
                      alt="Catalog"
                    />
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" aria-current="page" to="/cart">
                    <i className="fas fa-heart"></i>
                    {cartItems.length > 0 && (
                      <span className="badge position-absolute translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </li>
                <div className="dropdown-center">
                  <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user"></i>
                  </button>
                  <ul className="dropdown-menu right-p" id="loginstatus">
                    {getLoginId ? (
                      <>
                        <li><Link className="dropdown-item" to={`./userprofile/${getLoginId}`}>Perfil</Link></li>
                        <li><Link className="dropdown-item" to="./dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item" href="#" onClick={Logout}>Logout</Link></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/signup">Signup</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userprofile/:id" element={<DetailedProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/pages/orderdetails/:id" element={<OrderDetails/>} />
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/clients" element={<Clients/>}/>
        </Routes>
      </AnimatePresence>

    </>
  );
}
