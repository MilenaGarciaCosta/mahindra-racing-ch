import React from 'react';
import "../css/nav.css"
import "../css/main.css"
import "../script/nav"
import { Link } from "react-router-dom"
import { navbarPopUp,  } from "../script/nav.js"

const Nav = () => {
  return (
    <>
      <nav className="primary-navbar">
        <div className="nav-left">
          <div className="logo-comp">
            <a href="../home-pag/index.html">
              <img src="" alt="Logo" id="logo" />
            </a>
          </div>
        </div>
        <ul className="nav-right">
          <li><Link to={"#"}>Formula E</Link></li>
          <li><Link to={"#"}>E-game</Link></li>
          <li><Link to={"#"}>Loja</Link></li>
        </ul>

        <ul className="nav-dropDown">
          <li><Link to={"#"}>Formula E</Link></li>
          <li><Link to={"#"}>E-game</Link></li>
          <li><Link to={"#"}>Loja</Link></li>
        </ul>

        <div className="menu-burguer">
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" onClick={navbarPopUp}/>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </nav>
    </>
  );
};

export default Nav;
