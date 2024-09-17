import "../css/loja.css";

const Loja = () => {
  return (
    <section className="main">
      <div className="titulo-container">
        <h2>LOJA</h2>
      </div>
      <div className="p-1 grid grid-cols-4">
        <div className="flex-shrink-0 m-6 w-60 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: 'scale(1.5)', opacity: 0.1 }}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}
            ></div>
            <img
              className="relative w-40"
              src="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png"
              alt=""
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">Roupas</span>
              <span className="font-semibold text-lg">Moletom Formula E</span>
              <div className="flex justify-center">
              <span className="bg-white w-fit mt-2 cursor-pointer rounded-full text-teal-500 text-xs font-bold px-5 py-2 leading-none flex items-center">
                $45.00
              </span>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loja;
