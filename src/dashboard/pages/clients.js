import { useState } from "react";
import SideBarMenu from "../components/sidebarmenu";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Clients() {
    
    const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';
    const query = `query PedidosDoCliente {
      pedidos {
        id
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
        stage
      }
    }`;

    const [pedidosFeitos, setPedidosFeitos] = useState([]); // State to hold fetched data

    useEffect(() => {
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })
        .then(res => res.json())
        .then(data => {
            setPedidosFeitos(data.data.pedidos); // Update state with fetched data
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
    }, []);

    // Function to calculate total value of resumoDaCompra
    const calculateTotal = (resumoDaCompra) => {
        return resumoDaCompra.reduce((total, item) => {
            return total + (item.preco * item.quantidade);
        }, 0);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}

                    <SideBarMenu/>

                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Clientes</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                        </div>
                    </div>
                   
                </main>
            </div>
        </div>
        
    );
}
