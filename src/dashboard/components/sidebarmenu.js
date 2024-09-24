import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Link, useLocation } from "react-router-dom";



export default function SideBarMenu() {
    return (

        <>
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                       <Link className="nav-link active" to="/dashboard">
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                       <Link className="nav-link" to="/orders">
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            Pedidos
                        </Link>
                    </li>
                    <li className="nav-item">
                       <Link className="nav-link" to="/products">
                            <FontAwesomeIcon icon={faBox} className="me-2" />
                            Productos
                        </Link>
                    </li>
                    <li className="nav-item">
                       <Link className="nav-link" to="/clients">
                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                            Clientes
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

       
        </>
    );
}
