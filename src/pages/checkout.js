import { useContext, useState } from "react";
import { CartContext } from "../components/cartcontext.js";
import { useNavigate } from "react-router-dom";
import { frameData, motion } from "framer-motion";
import { useEffect } from "react";

export default function Checkout() {
    const { cartItems, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({ name: "", email: "", address: "", phone: "", city: "", state: "", zip: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    
    const query = `mutation OrderSummary($nome: String, $apelido: String!, $email: String!,$phone:String! $endereco: String!, $cidade: String!, $provincia: String, $codigoPostal: String!, $nomeDoProducto: Json!, $preco: String!, $quantidade: String!,$resumo:Json!) {
  createPedido(
    data: {nome: $nome, apelido: $apelido, email: $email,phoneefone:$phone endereco: $endereco, cidade: $cidade, provincia: $provincia, codigoPostal: $codigoPostal, nomeDoProducto: $nomeDoProducto, preco: $preco, quantidade: $quantidade, resumoDaCompra:$resumo}
  ) {
    id
    nomeDoProducto
    preco
    quantidade
    nome
    apelido
    email
    phoneefone
    endereco
    cidade
    provincia
    codigoPostal
    resumoDaCompra
  }
}
`;



    let count = 0;

    let getProductCart = cartItems.map((item, index) => {
        return {
            id: item.id,
            nomeDoProducto: item.nome,
            preco: item.preco,
            quantidade: item.quantity
        };
    });
    
    console.log(getProductCart);
    
    // Assuming you want to populate the variables with the first product's details:
    let productNames = '';
    let productPrices = '';
    let productQuantities = '';

for (let index = 0; index < getProductCart.length; index++) {
    const nomeDaPeca = getProductCart[index].nomeDoProducto;
    const precoDaPeca = getProductCart[index].preco;
    const quantidadeDaPeca = getProductCart[index].quantidade;
    let nomeProducto = JSON.stringify(nomeDaPeca);
    productNames += nomeProducto + ', '; // Concatenating the names
    productPrices += precoDaPeca + ', '; // Concatenating the prices
    productQuantities += quantidadeDaPeca + ', '; // Concatenating the quantities
}

   
    const countnput = ()=>{
        let check = document.gephoneementById('createAccount'); 
        let passField = document.gephoneementById('passwordField');
        let inputDisable = document.gephoneementById('inputPassword');

      count++;
       
      if(count===1){
        check.checked=true; 
        passField.style.display="block";
        inputDisable.disabled=false;
      }else if(count===2){
       
        count=0;
        check.checked=false;
        inputDisable.disabled=true; 
        passField.style.display="none";
      }
    }



 


    // Calculate the subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.preco * item.quantity), 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Simple validation
        if (!formData.name || !formData.email || !formData.address) {
            setError("All fields are required.");
            return;
        }
    
       
    
        const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    nome: formData.name,
                    apelido: formData.lastName,
                    email: formData.email,
                    endereco: formData.address,
                    cidade: formData.city,
                    provincia: formData.state,
                    codigoPostal: formData.zip,
                    phoneefone: formData.phone,
                    // You may need to map orderItems for your query depending on how the mutation is defined
                    nomeDoProducto: productNames, // Example, adjust as needed
                    preco: productPrices, // Example, adjust as needed
                    quantidade: productQuantities,// Example, adjust as needed
                    resumo: getProductCart
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            clearCart();
            navigate("/confirmation"); // Redirect to a confirmation page
        })
        .catch(error => {
            console.error('Error:', error);
            setError("An error occurred while processing your order.");
        });
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
                                <h3>Billing details</h3>
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="col-md-6">
                                        <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="inputFirstName" name="name" value={formData.name} onChange={handleChange}  required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="inputLastName" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputEmail" className="form-label">E-mail</label>
                                        <input type="email" className="form-control" id="inputEmail" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required/>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAddress" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="inputAddress" name="address" value={formData.address} onChange={handleChange} placeholder="Apartment, studio, or floor" required/>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputphone" className="form-label">phone:</label>
                                        <input type="text" className="form-control" id="inputphone" name="phone" value={formData.phone} onChange={handleChange} placeholder="258 84 000 0000 0" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputCity" className="form-label">City</label>
                                        <input type="text" className="form-control" id="inputCity" name="city" value={formData.city} onChange={handleChange} required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputState" className="form-label">State</label>
                                        <select id="inputState" className="form-select" name="state" value={formData.state} onChange={handleChange} required>
                                            <option value="" disabled>Choose...</option>
                                           <option value="Maputo">Maputo</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="inputZip" className="form-label">Zip</label>
                                        <input type="number" className="form-control" id="inputZip" name="zip" value={formData.zip} onChange={handleChange} required/>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                                            <label className="form-check-label" htmlFor="gridCheck">
                                                Check me out
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="createAccount" onClick={countnput}/>
                                            <label className="form-check-label" htmlFor="createAccount">
                                                Create account
                                            </label>
                                        </div>
                                        <div className="col-12" id="passwordField">
                                            <label htmlFor="inputPassword" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword" name="password" value={formData.password} onChange={handleChange} />
                                        </div>
                                    </div>

                                 
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h3>Order Summary</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.nome}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>MT {item.preco.toFixed(2)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">Your cart is empty.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td colSpan="2">MT {subtotal.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
