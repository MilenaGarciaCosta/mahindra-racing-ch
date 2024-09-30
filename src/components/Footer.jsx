import "../css/footer.css";
import Carrinho from "../img/carrinho.png"

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Vigil Race. Todos os direitos reservados.</p>
          <ul className="social-links">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
        <div className="imagem-car">
          <img id="carro-car" src={Carrinho} alt="Carrinho de corrida" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
