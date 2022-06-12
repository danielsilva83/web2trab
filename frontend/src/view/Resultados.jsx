import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Resultado from "../components/resultado";
import VerResultado from "../components/cadastrarResultado";
import NavBar from "../components/navbar-dashboard";
import "../styles/resultados.css";

function Resultados() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [resultados, setResultados] = useState([]);
  const baseURL = "http://localhost:8010/api/resultados";

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
        console.log(res.data.resultados);
        setResultados(res.data.resultados);
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
        paginaSelecionada="resultados"
        btnTexto="Resultado"
        criar={handleShow}
      />
      <div className="questoes-content">
        {resultados.map((item) => (
          <Resultado item={item} />
        ))}
      </div>
      {show && <VerResultado open={handleShow} close={handleClose} />}
    </>
  );
}

export default Resultados;
