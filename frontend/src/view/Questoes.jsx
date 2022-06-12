import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import CadastrarQuestoes from "../components/cadastrarQuestoes";
import NavBar from "../components/navbar-dashboard";
import Questao from "../components/questoes";
import "../styles/questoes.css";

const baseURL = "http://localhost:8010/api/questoes";

function Questoes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [questoes, setQuestoes] = useState([]);
  const listaQuestoes = [];

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${usuarioToken}`,
    };

    axios
      .get(baseURL, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.questoes);
        setQuestoes(res.data.questoes);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }, [show]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavBar
        paginaSelecionada="questoes"
        btnTexto="Questao"
        criar={handleShow}
      />
      <div className="questoes-content">
        {questoes.map((item) => (
          <Questao item={item} />
        ))}
      </div>
      {show && <CadastrarQuestoes open={handleShow} close={handleClose} />}
    </>
  );
}

export default Questoes;
