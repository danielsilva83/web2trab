import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.png";
import banner01 from "../assets/banner01.png";
import banner02 from "../assets/banner02.png";
import lamp from "../assets/lamp.png";
import peopleAbstract from "../assets/people_abstract.png";
import smartphoneIlustration from "../assets/smartphone_ilustration.png";
import "../styles/home.css";

function Home() {
  return (
    <div
      className="div-principal"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="header">
        <Link to="/" className="logo">
          TemRazão
        </Link>
        <Link to="/login">
          <button className="main-acessar">Acessar</button>
        </Link>
      </div>
      <div className="principal-content">
        <div>
          <h2>
            <b style={{ fontSize: 32 }}>
             Bem vindo!<br /> 
            </b>
          </h2>
          <p>
            TemRazão é um aplicativo 
            <br />
            gerador de exercicios de  
            <br />
            fração
            <br />
            Melhore seus scores
            <br />
            e fique fera em frações.
            <br />
            Teste seus limites!
          </p>
        </div>
        <div className="banners-content">
          <img src={banner01} className="banner01" alt="Bloco de resultado" />
          <img src={banner02} alt="Gráfico" className="banner02" />
        </div>
      </div>
      <div className="footer-text">
      </div>
      <div className="footer-content">
        <div className="secondary__items">
          <p>UTFR - 2022 - Eng de Software</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
