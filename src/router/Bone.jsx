// src/components/Bone.jsx

import React, { useState } from 'react';
import fotoProduto1 from "../img/bone-mahindra-ft1.png";
import fotoProduto2 from "../img/bone-mahindra-ft2.png";
import { Link } from "react-router-dom";
import "../css/produto.css";
import axios from 'axios';

const Bone = () => {
  const [pontos, setPontos] = useState(null);
  const itemCost = 100; // Custo do boné

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
        itemName: 'Boné Mahindra Racing',
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
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f2f2f2"
                  version="1.1"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                </svg>
                <p>Voltar</p>
              </button>
            </Link>
            <div className="pontosContainer">
              <span id="pontosUsuarios">250</span> pontos
              <svg
                id="pontosSvg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="0.5"
                    d="M12 16.0678L8.22855 19.9727C7.68843 20.532 7.41837 20.8116 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4601C5.69597 20.2494 5.65848 19.8694 5.5835 19.1094C5.54117 18.6803 5.52 18.4657 5.45575 18.286C5.31191 17.8837 5.00966 17.5708 4.6211 17.4218C4.44755 17.3553 4.24033 17.3334 3.82592 17.2895L3.82589 17.2895C3.09187 17.2119 2.72486 17.1731 2.52138 17.0485C2.05772 16.7647 1.87548 16.1661 2.08843 15.6265C2.18188 15.3897 2.45194 15.1101 2.99206 14.5509L5.45575 11.9999L6.69396 10.7617L12 16.0678L17.306 10.7617L18.5442 11.9999L21.0079 14.5509C21.5481 15.1101 21.8181 15.3897 21.9116 15.6265C22.1245 16.1661 21.9423 16.7647 21.4786 17.0485C21.2751 17.1731 20.9081 17.2119 20.1741 17.2895C19.7597 17.3334 19.5525 17.3553 19.3789 17.4218C18.9903 17.5708 18.6881 17.8837 18.5442 18.286C18.48 18.4657 18.4588 18.6803 18.4165 19.1094V19.1094C18.3415 19.8694 18.304 20.2494 18.1837 20.4601C17.9096 20.9402 17.3315 21.1289 16.8103 20.9084C16.5816 20.8116 16.3116 20.532 15.7715 19.9727L12 16.0678Z"
                    fill="#D50019"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16ZM12 6C11.7159 6 11.5259 6.34084 11.1459 7.02251L11.0476 7.19887C10.9397 7.39258 10.8857 7.48944 10.8015 7.55334C10.7173 7.61725 10.6125 7.64097 10.4028 7.68841L10.2119 7.73161C9.47396 7.89857 9.10501 7.98205 9.01723 8.26432C8.92945 8.54659 9.18097 8.84072 9.68403 9.42898L9.81418 9.58117C9.95713 9.74833 10.0286 9.83191 10.0608 9.93531C10.0929 10.0387 10.0821 10.1502 10.0605 10.3733L10.0408 10.5763C9.96476 11.3612 9.92674 11.7536 10.1565 11.9281C10.3864 12.1025 10.7318 11.9435 11.4227 11.6254L11.6014 11.5431C11.7978 11.4527 11.8959 11.4075 12 11.4075C12.1041 11.4075 12.2022 11.4527 12.3986 11.5431L12.5773 11.6254C13.2682 11.9435 13.6136 12.1025 13.8435 11.9281C14.0733 11.7536 14.0352 11.3612 13.9592 10.5763L13.9395 10.3733C13.9179 10.1502 13.9071 10.0387 13.9392 9.93531C13.9714 9.83191 14.0429 9.74833 14.1858 9.58118L14.316 9.42898C14.819 8.84072 15.0706 8.54659 14.9828 8.26432C14.895 7.98205 14.526 7.89857 13.7881 7.73161L13.5972 7.68841C13.3875 7.64097 13.2827 7.61725 13.1985 7.55334C13.1143 7.48944 13.0603 7.39258 12.9524 7.19887L12.8541 7.02251C12.4741 6.34084 12.2841 6 12 6Z"
                    fill="#D50019"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>

          <div className="flex-produto">
            <div className="img-container">
              <div className="img-back">
                <img
                  className="foto1"
                  src={fotoProduto1}
                  alt="Boné Mahindra Racing"
                />
              </div>
              <div className="img-back">
                <img className="foto2" src={fotoProduto2} alt="" />
              </div>
            </div>
            <div className="descricaoProduto">
              <h2>Boné Mahindra Racing</h2>

              <p className="textoDescricao">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In aliquid similique quam culpa, porro debitis laudantium officiis, eaque nostrum, maxime accusamus itaque recusandae dolores ipsum architecto. Similique laboriosam voluptatum maiores!
              </p>

              <div className="compraContainer">
                <div className="valorProduto">
                  <span className="valor">100</span> pontos
                  <svg
                    id="pontosSvg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        opacity="0.5"
                        d="M12 16.0678L8.22855 19.9727C7.68843 20.532 7.41837 20.8116 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4601C5.69597 20.2494 5.65848 19.8694 5.5835 19.1094C5.54117 18.6803 5.52 18.4657 5.45575 18.286C5.31191 17.8837 5.00966 17.5708 4.6211 17.4218C4.44755 17.3553 4.24033 17.3334 3.82592 17.2895L3.82589 17.2895C3.09187 17.2119 2.72486 17.1731 2.52138 17.0485C2.05772 16.7647 1.87548 16.1661 2.08843 15.6265C2.18188 15.3897 2.45194 15.1101 2.99206 14.5509L5.45575 11.9999L6.69396 10.7617L12 16.0678L17.306 10.7617L18.5442 11.9999L21.0079 14.5509C21.5481 15.1101 21.8181 15.3897 21.9116 15.6265C22.1245 16.1661 21.9423 16.7647 21.4786 17.0485C21.2751 17.1731 20.9081 17.2119 20.1741 17.2895C19.7597 17.3334 19.5525 17.3553 19.3789 17.4218C18.9903 17.5708 18.6881 17.8837 18.5442 18.286C18.48 18.4657 18.4588 18.6803 18.4165 19.1094V19.1094C18.3415 19.8694 18.304 20.2494 18.1837 20.4601C17.9096 20.9402 17.3315 21.1289 16.8103 20.9084C16.5816 20.8116 16.3116 20.532 15.7715 19.9727L12 16.0678Z"
                        fill="#D50019"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16ZM12 6C11.7159 6 11.5259 6.34084 11.1459 7.02251L11.0476 7.19887C10.9397 7.39258 10.8857 7.48944 10.8015 7.55334C10.7173 7.61725 10.6125 7.64097 10.4028 7.68841L10.2119 7.73161C9.47396 7.89857 9.10501 7.98205 9.01723 8.26432C8.92945 8.54659 9.18097 8.84072 9.68403 9.42898L9.81418 9.58117C9.95713 9.74833 10.0286 9.83191 10.0608 9.93531C10.0929 10.0387 10.0821 10.1502 10.0605 10.3733L10.0408 10.5763C9.96476 11.3612 9.92674 11.7536 10.1565 11.9281C10.3864 12.1025 10.7318 11.9435 11.4227 11.6254L11.6014 11.5431C11.7978 11.4527 11.8959 11.4075 12 11.4075C12.1041 11.4075 12.2022 11.4527 12.3986 11.5431L12.5773 11.6254C13.2682 11.9435 13.6136 12.1025 13.8435 11.9281C14.0733 11.7536 14.0352 11.3612 13.9592 10.5763L13.9395 10.3733C13.9179 10.1502 13.9071 10.0387 13.9392 9.93531C13.9714 9.83191 14.0429 9.74833 14.1858 9.58118L14.316 9.42898C14.819 8.84072 15.0706 8.54659 14.9828 8.26432C14.895 7.98205 14.526 7.89857 13.7881 7.73161L13.5972 7.68841C13.3875 7.64097 13.2827 7.61725 13.1985 7.55334C13.1143 7.48944 13.0603 7.39258 12.9524 7.19887L12.8541 7.02251C12.4741 6.34084 12.2841 6 12 6Z"
                        fill="#D50019"
                      ></path>{" "}
                    </g>
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

export default Bone;
