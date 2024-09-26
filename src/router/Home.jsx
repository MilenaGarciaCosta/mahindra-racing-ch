import "../css/home.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
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
        navigation
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img className="banner" src={item.image} alt={`Slide ${item.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      
    <section className="main">
        
    </section>
    </>
  );
};

export default Home;