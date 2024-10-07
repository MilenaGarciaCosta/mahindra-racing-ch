import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/home.css";
import background from '../img/background_img.png';

register();

import banner1 from "../img/card1.png";
import banner2 from "../img/card2.png";

const Home = () => {
  const data = [
    { id: "1", image: banner1 },
    { id: "2", image: banner2 },
  ];

  return (
    <>
      <div id="backgroundImg">
        <img src={background} />
      </div>

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
        <h3 id="dt-corridas">Próximas corridas</h3>
        <div className="container-card">
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">São Paulo</span>
                <p className="card-content-dt">
                  Round 1
                </p>
                <span className="see-more-dt">Comprar ingresso</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">Dezembro</span>
                <span className="date-dt">07</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">Mexico city</span>
                <p className="card-content-dt">
                  Round 2
                </p>
                <span className="see-more-dt">Comprar ingresso</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">Janeiro</span>
                <span className="date-dt">11</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">Jeddah</span>
                <p className="card-content-dt">
                  Round 3
                </p>
                <span className="see-more-dt">Comprar ingresso</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">Fevereiro</span>
                <span className="date-dt">14</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">Jeddah</span>
                <p className="card-content-dt">
                  Round 4
                </p>
                <span className="see-more-dt">Comprar ingresso</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">Fevereiro</span>
                <span className="date-dt">15</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
