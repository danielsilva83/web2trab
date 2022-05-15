import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function ModalResultado(props) {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [show, setShow] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const baseURL = "http://localhost:8010/api/resultados";

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  const dadosResultados = {
    titulo: titulo,
    descricao: descricao,
  };

  function cadastrarResultado() {
    axios
      .post(baseURL, dadosResultados, {
        headers: headers,
      })
      .then((res) => {
        toast.success("Resultado criada com sucesso");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  function atualizar(id) {
    if (id) {
      axios
        .put(`${baseURL}/${id}`, dadosResultados, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Resultado alterada com sucesso");
          props.close();
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  useEffect(() => {
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
    props.item ? setDescricao(props.item.descricao) : setDescricao("");
  }, []);

  return (
    <div className="modal">
      <div>
        <Toaster />
      </div>
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar Resultado</Modal.Title>
          ) : (
            <Modal.Title>Resolver Resultados</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Titulo da Resultado
            <input
              type="text"
              className="form-control"
              id="tituloResultado"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
          </div>
          <div className="my-2">
            Conteúdo da Resultado
            <textarea
              className="form-control"
              id="textoResultado"
              onChange={(e) => setDescricao(e.target.value)}
              value={props.item && descricao}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={
              props.item
                ? () => {
                    atualizar(props.item._id);
                  }
                : cadastrarResultado
            }
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalResultado;
