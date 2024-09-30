import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/home.css";

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
                <span className="card-title-dt">3D Card</span>
                <p className="card-content-dt">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <span className="see-more-dt">See More</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">JUNE</span>
                <span className="date-dt">29</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">3D Card</span>
                <p className="card-content-dt">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <span className="see-more-dt">See More</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">JUNE</span>
                <span className="date-dt">29</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">3D Card</span>
                <p className="card-content-dt">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <span className="see-more-dt">See More</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">JUNE</span>
                <span className="date-dt">29</span>
              </div>
            </div>
          </div>
          <div className="parent-dt">
            <div className="card-dt">
              <div className="content-box-dt">
                <span className="card-title-dt">3D Card</span>
                <p className="card-content-dt">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <span className="see-more-dt">See More</span>
              </div>
              <div className="date-box-dt">
                <span className="month-dt">JUNE</span>
                <span className="date-dt">29</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
