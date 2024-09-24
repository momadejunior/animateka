import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/cartcontext.js';

const Productos = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const { addToCart } = useContext(CartContext);

    const query = `
    query Productos {
        productos {
            id
            descricao
             descricaoCompleta {
      html
    }
            imagemDoProducto {
                url
            }
            nome
            preco
        }
    }
`;

    useEffect(() => {
        const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ query }),
            variables: {
                id: 'root',
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(data => {
                setData(data.data.productos);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleQuantityChange = (id, event) => {
        setQuantities({
            ...quantities,
            [id]: parseInt(event.target.value, 10) || 1,
        });
    };

    const handleAddToCart = (producto) => {
        const quantity = quantities[producto.id] || 1;
        addToCart(producto, quantity);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h3>Productos</h3>
            {data && data.map((producto) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={producto.id}>
                    <div className="card products">
                        <Link to={`/details/${producto.id}`}>
                            <img src={producto.imagemDoProducto[0].url} alt={producto.nome} className="card-img-top" />
                        </Link>
                        <div className="card-body">
                            <div className='description'>
                                <Link to={`/details/${producto.id}`}>
                                    <h5 className="card-title">{producto.nome}</h5>
                                </Link>
                                <p>{producto.preco} MT</p>
                            </div>
                            <div className='addToCart'>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[producto.id] || 1}
                                    onChange={(event) => handleQuantityChange(producto.id, event)}
                                    className="form-control"
                                    style={{ width: '60px', display: 'inline-block', marginRight: '10px' }}
                                />
                                <button
                                    onClick={() => handleAddToCart(producto)}
                                    className="btn btn-danger">
                                    <i className="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Productos;
