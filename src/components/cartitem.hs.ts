import { useContext } from 'react';
import { CartContext } from '../components/cartcontext.js';

export default function CartItem({ item }) {
    const { updateCartItemQuantity, removeFromCart } = useContext(CartContext);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        updateCartItemQuantity(item.id, newQuantity);
    };

    return (
        <div>
            <img src={item.imagemDoProducto[0].url} alt={item.nome} />
            <h4>{item.nome}</h4>
            <input 
                type="number" 
                value={item.quantity} 
                onChange={handleQuantityChange} 
                min="1"
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
}
