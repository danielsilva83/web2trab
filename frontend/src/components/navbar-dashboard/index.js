import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavbarDashboard(props) {
  return (
    <header>
      <Link to="/" className="logo-nav">
        TemRazão
      </Link>
      <div className="div__nav">
        <nav className="header__nav">
          <ul className="nav__links">
            <li>
              <Link
                to="/home"
                style={
                  props.paginaSelecionada === "home"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="resultados"
                style={
                  props.paginaSelecionada === "resultados"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Resultados
              </Link>
            </li>
            <li>
              <Link
                to="questoes"
                style={
                  props.paginaSelecionada === "questoes"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Questoes
              </Link>
            </li>
          </ul>
        </nav>
        <a>
          {props.btnTexto ? (
            <button
              className="btn__criar"
              id="botaoVerResultado"
              onClick={props.criar}
            >
              {props.paginaSelecionada === "livros"
                ? `Adicionar ${props.btnTexto}`
                : `Ver ${props.btnTexto}`}
            </button>
          ) : null}
          {props.sair ? (
            <button
              className="btn__criar"
              id="botaoVerResultado"
              onClick={props.sair}
            >
              Logout
            </button>
          ) : null}
        </a>
      </div>
    </header>
  );
}

export default NavbarDashboard;
