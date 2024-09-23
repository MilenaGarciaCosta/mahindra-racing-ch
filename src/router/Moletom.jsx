import React, { useState } from 'react';
import fotoProduto1 from "../img/bone-mahindra-ft1.png";
import fotoProduto2 from "../img/bone-mahindra-ft2.png";
import { Link } from "react-router-dom";
import "../css/produto.css";
import axios from 'axios';

const Moletom = () => {
  const [pontos, setPontos] = useState(null);
  const itemCost = 200; // Custo do moletom

  const handleResgatar = async () => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      alert('Realizar login antes de resgatar itens');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/usuario/resgatar', {
        usuarioId,
        itemCost,
        itemName: 'Moletom Mahindra Racing',
      });

      if (response.data.success) {
        setPontos(response.data.total_pontos);
        alert(response.data.message);
      } else {
        alert(response.data.message || 'Saldo insuficiente');
      }
    } catch (error) {
      console.error('Erro ao resgatar item:', error);
      alert('Erro ao resgatar item');
    }
  };

  return (
    <>
      <section className="main mainProduto">
        <div className="flex-main">
          <div className="voltarContainer">
            <Link to="/loja">
              <button id="voltarBtn">
                {/* SVG do botão voltar */}
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f2f2f2"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                >
                  {/* ...conteúdo do SVG... */}
                </svg>
                <p>Voltar</p>
              </button>
            </Link>
            <div className="pontosContainer">
              <span id="pontosUsuarios">{pontos !== null ? pontos : '---'}</span> pontos
              {/* SVG dos pontos */}
              <svg
                id="pontosSvg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ...conteúdo do SVG... */}
              </svg>
            </div>
          </div>

          <div className="flex-produto">
            <div className="img-container">
              <div className="img-back">
                <img
                  className="foto1"
                  src={fotoProduto1}
                  alt="Moletom Mahindra Racing"
                />
              </div>
              <div className="img-back">
                <img className="foto2" src={fotoProduto2} alt="" />
              </div>
            </div>
            <div className="descricaoProduto">
              <h2>Moletom Mahindra Racing</h2>

              <p className="textoDescricao">
                Descrição do produto...
              </p>

              <div className="compraContainer">
                <div className="valorProduto">
                  <span className="valor">{itemCost}</span> pontos
                  {/* SVG dos pontos */}
                  <svg
                    id="pontosSvg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* ...conteúdo do SVG... */}
                  </svg>
                </div>

                <div className="compraContainer">
                  <button className="button" onClick={handleResgatar}>
                    Resgatar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Moletom;


