import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

register();

import banner1 from "../img/card1.png";
import banner2 from "../img/card2.png";
import banner3 from "../img/banner3.png";

const Home = () => {
  const data = [
    { id: "1", image: banner1 },
    { id: "2", image: banner2 },
    { id: "3", image: banner3 },
  ];

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img className="banner" src={item.image} alt={`Slide ${item.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="main">
        <div className="aprenda">
          <h3 id="dt-corridas">Aprenda a jogar</h3>
        </div>
        <div className="container-home">
          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">1°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Como Jogar</span>
                <span className="text">
                  Entre no link de formula E para acessar o jogo e começar a se divertir!
                </span>
              </div>
            </div>
          </div>

          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">2°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Como Jogar</span>
                <span className="text">
                  Dentro do Formula E, análise todas a tabela para um chute melhor de quem vai ganhar
                </span>
              </div>
            </div>
          </div>

          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">3°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Como Jogar</span>
                <span className="text">
                  Escolha o corredor que mais te agrada e aposte nele
                </span>
              </div>
            </div>
          </div>
        </div>
        <h3 id="dt-corridas">Data das corridas</h3>
        <div className="container-card">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Corrida</p>
                <p></p>
              </div>
              <div className="flip-card-back">
                <p className="title">21/04/2025</p>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
