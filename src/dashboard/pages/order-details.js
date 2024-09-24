import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarMenu from "../components/sidebarmenu";


export default function OrderDetails() {
  const { id } = useParams();
  const url = "https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master";
  const query = `query PedidosDoCliente($id: ID!) {
        pedidos(where: { id: $id }) {
           id
           nomeDoProducto
           preco
           quantidade
           nome
           apelido
           email
           telefone
           endereco
           cidade
           provincia
           codigoPostal
           resumoDaCompra
        }
    }`;

  const [pedidosFeitos, setPedidosFeitos] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { id } }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPedidosFeitos(data.data.pedidos || []);
        setSummary(Array.isArray(data.data.pedidos[0]?.resumoDaCompra) ? data.data.pedidos[0].resumoDaCompra : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = summary.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const shipping = 0; // Replace with actual shipping logic if needed
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = calculateTotals();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <SideBarMenu/>
        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
            </div>
          </div>

          <h2>Detalhe de pedido</h2>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && pedidosFeitos.length === 0 && <p>No orders found.</p>}
                {!loading && pedidosFeitos.length > 0 && (
                  <table className="table">
                    <thead>
                      <tr><th>Field</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                      {pedidosFeitos.map(({ id, nome, apelido, email, telefone, provincia, cidade, codigoPostal }) => (
                        <React.Fragment key={id}>
                          <tr><td>ID</td><td>{id}</td></tr>
                          <tr><td>Nome</td><td>{nome}</td></tr>
                          <tr><td>Apelido</td><td>{apelido}</td></tr>
                          <tr><td>Email</td><td><a href={`mailto:${email}`}>{email}</a></td></tr>
                          <tr><td>Telefone</td><td>{telefone}</td></tr>
                          <tr><td>Provincia</td><td>{provincia}</td></tr>
                          <tr><td>Cidade</td><td>{cidade}</td></tr>
                          <tr><td>Código Postal</td><td>{codigoPostal}</td></tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="col-md-4">
                {summary.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr><th>Nome do Produto</th><th>Preço</th><th>Quantidade</th></tr>
                    </thead>
                    <tbody>
                      {summary.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nomeDoProducto}</td>
                          <td>{item.preco}</td>
                          <td>{item.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No summary available.</p>
                )}
              </div>

              <div className="col-md-4">
                <div className="row">
                  <p>Subtotal: {subtotal}MT</p>
                  <p>Envio: {shipping}MT</p>
                  <p>Total da encomenda: {total}MT</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
