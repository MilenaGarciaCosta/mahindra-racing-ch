import "../css/nav.css"
import '../css/main.css'
import Logo from "../img/logo.png"
import ProfileIcon from "../img/profile-icon.png"

const Nav = () => {
  return (
    <nav className="primary-navbar">
      <div className="nav-left">
        <div className="logo-comp">
          <a href="../home-pag/index.html">
            <img src={Logo} alt="Logo mahindra" id="logo" />
          </a>
        </div>
      </div>
      <div id="nav-right">
        <ul>
          <li>
            <a href="../formulaE-pag/formulaE.html">Fórmula E</a>
          </li>
          <li>
            <a href="../loja-pag/loja.html">Loja</a>
          </li>
          <li>
            <a href="../eGame-pag/eGame.html">E-game</a>
          </li>
          <div className="profile-container">
            <li>
              <a href="">
                <img src={ProfileIcon} alt="" />
              </a>
            </li>
            <div className="cad-log-container">
              <li>
                <a href="../entrar-pag/entrar.html">Entrar</a>
              </li>
              <li>
                <a href="../cadastro-pag/cadastro.html">Cadastrar</a>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
