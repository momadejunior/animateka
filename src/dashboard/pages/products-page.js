import { useState } from "react";
import SideBarMenu from "../components/sidebarmenu";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ProductsPage() {


  const requests= `query PedidosDoCliente {
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
}`;

const users = `query users {
  profiles {
    id
    name
    surname
    email
    username
  }
}`;


const products = `query Productos {
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
}`;




  const [pedidos, setPedidos] = useState([]);









  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}

        <SideBarMenu />

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
           <div><h1 className="h2">Products</h1><div className="btn btn-primary">Adiconar novo producto</div></div>
            <div className="btn-toolbar mb-2 mb-md-0"></div>
          </div>

          <table class="table table-bordered table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Selecionar</th>
                <th>Imagem</th>
                <th>Nome</th>
                <th>REF</th>
                <th>Stock</th>
                <th>Preço</th>
                <th>Categorias</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <img
                    src="path/to/image.jpg"
                    alt="Litandrinha"
                    class="img-fluid"
                    style={{maxWidth:100,}}
                  />
                </td>
                <td>Litandrinha</td>
                <td>302</td>
                <td>Em stock</td>
                <td>1800,00MT</td>
                <td>Todas as Categorias</td>
                <td>
                  Publicado
                  <br />
                  2024/09/16 às 8:03
                </td>
                <td>
                  <a href="#" class="btn btn-primary btn-sm">
                    Editar
                  </a>
                  <a href="#" class="btn btn-danger btn-sm">
                    Lixo
                  </a>
                  <a href="#" class="btn btn-info btn-sm">
                    Ver
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
