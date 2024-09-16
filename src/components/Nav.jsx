import "../css/nav.css";
import "../css/main.css";
import Logo from "../img/logo.png";
import ProfileIcon from "../img/profile-icon.png";
import { Link } from "react-router-dom";

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
        <div className="menu-container">
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
