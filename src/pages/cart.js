import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../components/cartcontext.js";

export default function Cart() {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const [localCartItems, setLocalCartItems] = useState(cartItems);

    // Sync localCartItems with cartItems whenever cartItems changes
    useEffect(() => {
        setLocalCartItems(cartItems);
    }, [cartItems]);

    // Calculate the subtotal
    const subtotal = localCartItems.reduce((total, item) => total + (item.preco * item.quantity), 0);

    const handleQuantityChange = (id, event) => {
        const quantity = parseInt(event.target.value, 10) || 1;
        setLocalCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(quantity, 1) } // Ensure quantity is at least 1
                    : item
            )
        );
        // Update the cart in the context
        const updatedItem = localCartItems.find(item => item.id === id);
        addToCart(updatedItem, quantity - updatedItem.quantity); // Adjust the quantity change
    };

    const handleRemoveFromCart = (id) => {
        removeFromCart(id); // Remove from context
        setLocalCartItems((prevItems) => prevItems.filter(item => item.id !== id)); // Update local state
    };

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                duration: 0.5,
            }}
        >
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-7 col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                        {localCartItems.length > 0 ? (
                                            localCartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="card-summary-item">
                                                            <div className="card-thumb">
                                                                <img className="size-smaller_crop" src={item.imagemDoProducto[0].url} alt={item.nome} />
                                                            </div>
                                                            <div className="card-summary-description">
                                                                {item.nome} (x{item.quantity})
                                                            </div>
                                                            <div className="product-subtotal" data-title="Total">
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">MT</span>{(item.preco * item.quantity).toFixed(2)}
                                                                </span>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={item.quantity}
                                                                    onChange={(event) => handleQuantityChange(item.id, event)}
                                                                    className="form-control"
                                                                    style={{ width: '60px', display: 'inline-block', marginRight: '10px' }}
                                                                />
                                                                <button onClick={() => handleRemoveFromCart(item.id)} className="btn btn-link remove">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>Your cart is empty.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="cart-total">
                                    <table>
                                        <tbody>
                                            {localCartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="subtotal">
                                                            <div>{item.nome} (x{item.quantity})</div>
                                                            <div>MT {(item.preco * item.quantity).toFixed(2)}</div>
                                                        </div>
                                                        <hr />
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>
                                                    <div className="subtotal">
                                                        <div>Subtotal</div>
                                                        <div>MT {subtotal.toFixed(2)}</div>
                                                    </div>
                                                    <hr />
                                                    <div className="subtotal">
                                                        <div>Total</div>
                                                        <div>MT {subtotal.toFixed(2)}</div>
                                                    </div>
                                                    <Link to="/checkout">
                                                        <div className="btn btn-danger mt-4 checkout-btn">Proceed to checkout</div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
