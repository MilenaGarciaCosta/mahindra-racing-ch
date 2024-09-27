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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29.667 31.69"
                  className="svg"
                >
                  <path
                    id="Path_6"
                    d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                  />
                  <path
                    id="Path_7"
                    d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                  />
                  <path
                    id="Path_8"
                    d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29.667 31.69"
                  className="svg"
                >
                  <path
                    id="Path_6"
                    d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                  />
                  <path
                    id="Path_7"
                    d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                  />
                  <path
                    id="Path_8"
                    d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29.667 31.69"
                  className="svg"
                >
                  <path
                    id="Path_6"
                    d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                  />
                  <path
                    id="Path_7"
                    d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                  />
                  <path
                    id="Path_8"
                    d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                  />
                </svg>
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
