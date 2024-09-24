import React, { useEffect, useState } from 'react';
import { FaShareAlt, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SideBarMenu from './components/sidebarmenu';

export default function Dashboard() {
    const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchOrders = async () => {
        const request = {
            query: `query PedidosDoCliente {
                pedidos {
                    nome
                    apelido
                    email
                    endereco
                    provincia
                    cidade
                    nomeDoProducto
                    preco
                    quantidade
                    resumoDaCompra
                    createdAt
                }
            }`
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            const result = await response.json();
            setOrders(result.data.pedidos);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchUsers = async () => {
        const request = {
            query: `query users {
                profiles {
                    id
                    name
                    surname
                    email
                    username
                }
            }`
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            const result = await response.json();
            setUsers(result.data.profiles);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProducts = async () => {
        const request = {
            query: `query Productos {
                productos {
                    imagemDoProducto {
                        url
                    }
                    nome
                    preco
                    descricaoCompleta {
                        text
                    }
                }
            }`
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            const result = await response.json();
            setProducts(result.data.productos);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <SideBarMenu />

                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                    <FaShareAlt className="me-1" /> Share
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                    <FaDownload className="me-1" /> Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div className="row">
                        {/* Orders Card */}
                        <div className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Orders</h5>
                                    <ul>
                                        {orders.map((order, index) => (
                                            <li key={index}>
                                                {order.nome} - {order.nomeDoProducto} ({order.quantidade}) - ${order.preco}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Users Card */}
                        <div className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Users</h5>
                                    <ul>
                                        {users.map((user, index) => (
                                            <li key={index}>
                                                {user.name} {user.surname} - {user.email}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Products Card */}
                        <div className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Products</h5>
                                    <ul>
                                        {products.map((product, index) => (
                                            <li key={index}>
                                                {product.nome} - ${product.preco}
                                                <img src={product.imagemDoProducto.url} alt={product.nome} style={{ width: '100px' }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
