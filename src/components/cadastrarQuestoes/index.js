import axios from "axios";
import ptBR from "date-fns/locale/pt-BR";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const baseURL = "http://localhost:8010/api/questoes";

function ModalQuestao(props) {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [show, setShow] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materia, setMateria] = useState("Selecione uma disciplina");
  const [startDate, setStartDate] = useState(new Date());
  const [horario, setHorario] = useState();
  const [horaFormatada, setHoraFormatada] = useState("00:00");

  // const materias = [
  //   "Desenvolvimento Web 1",
  //   "Programação Desktop",
  //   "Teste De Software",
  //   "Teoria da computação",
  //   "Redes de computadores",
  // ];


  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  function gerarQuestao() {

    axios
      .post(baseURL, {
        headers: headers,
      })
      .then((res) => {
        toast.success("Questoes geradas com sucesso");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  useEffect(() => {
    if (props.item) {
      var data = new Date(props.item.dataHoraEntrega);
    }
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
  }, []);

  return (
    <div className="modal">
      <div>
        <Toaster />
      </div>
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Gerar Questao</Modal.Title>
          ) : (
            <Modal.Title>Gerar Questões</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Nivel de Dificuldade
            <input
              type="text"
              className="form-control"
              id="tituloQuestao"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
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
                 
                }
              : gerarQuestao
            }
          >
            Gerar Questões
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalQuestao;
