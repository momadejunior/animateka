import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from '../components/cartcontext.js';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage the product quantity
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const url = 'https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master';

  const query = `
    query ProductById($id: ID!) {
      productos(where: {id: $id}) {
        id
        imagemDoProducto {
          url
        }
        nome
        preco
        descricaoCompleta {
      html
    }
        descricao
      }
    }
  `;

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { id: id }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.productos.length > 0) {
        setProduct(data.data.productos[0]);
      } else {
        console.error("Product not found");
      }
    })
    .catch(error => {
      console.error("Error fetching the product:", error);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (quantity < 1) return;
    addToCart({ ...product, quantity });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <h4>Detalhes do Produto</h4>
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.imagemDoProducto[0].url}
              alt="Imagem do Produto"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="col-md-6">
            <h4>{product.nome}</h4>
            <p>{product.descricao}</p>
            <p>Preço: {product.preco} MT</p>
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantidade:</label>
              <input 
                type="number" 
                id="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, e.target.value))} 
                min="1"
                className="form-control"
                style={{ width: '100px', marginBottom: '10px' }}
              />
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleAddToCart} 
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Descrição
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Contact
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div dangerouslySetInnerHTML={{__html:product.descricaoCompleta.html}}/>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
