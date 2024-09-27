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
          <p>aprenda a jogar</p>
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
                  Create, share, and use beautiful custom elements made with CSS
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
                  Create, share, and use beautiful custom elements made with CSS
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
                  Create, share, and use beautiful custom elements made with CSS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
