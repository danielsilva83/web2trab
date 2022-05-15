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

  const dadosQuestoes = {
    titulo: titulo,
    descricao: descricao,
    materia: materia,
    dataHoraEntrega: startDate,
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  function cadastrarQuestoes() {
    var horarioAux;
    horarioAux = horario.split(":", 2);
    startDate.setHours(horarioAux[0], horarioAux[1], 0);

    axios
      .post(baseURL, dadosQuestoes, {
        headers: headers,
      })
      .then((res) => {
        toast.success("Questao criada com sucesso");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  function atualizar(id) {
    var horarioAux;
    horarioAux = horario.split(":", 2);
    startDate.setHours(horarioAux[0], horarioAux[1], 0);
    if (id) {
      axios
        .put(`${baseURL}/${id}`, dadosQuestoes, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Questao alterada com sucesso");
          props.close();
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  function adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  useEffect(() => {
    if (props.item) {
      var data = new Date(props.item.dataHoraEntrega);
    }
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
    props.item ? setDescricao(props.item.descricao) : setDescricao("");
    props.item && setStartDate(data);
    props.item &&
      setHoraFormatada(
        adicionaZero(data.getHours()) + ":" + adicionaZero(data.getMinutes())
      );
    props.item && setMateria(props.item.materia);
    props.item && setHorario(horaFormatada);
  }, []);

  return (
    <div className="modal">
      <div>
        <Toaster />
      </div>
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar Questao</Modal.Title>
          ) : (
            <Modal.Title>Resolver Questões</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Titulo da Questao
            <input
              type="text"
              className="form-control"
              id="tituloQuestao"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
          </div>
          <div className="my-2">
            Conteúdo da Questao
            <textarea
              className="form-control"
              id="textoQuestao"
              onChange={(e) => setDescricao(e.target.value)}
              value={props.item && descricao}
            ></textarea>
          </div>
          <div className="my-2">
            Disciplina
            <input
              type="text"
              className="form-control"
              id="materia"
              onChange={(e) => setMateria(e.target.value)}
              value={props.item && materia}
            />
          </div>
          <div className="my-2">
            Data de entrega
            <DatePicker
              dateFormat="P"
              locale={ptBR}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="my-2">
            Horário de entrega
            <br />
            <input
              type="time"
              id="appt"
              name="appt"
              value={props.item ? horaFormatada : horario}
              onChange={(e) => {
                setHorario(e.target.value);
                setHoraFormatada(e.target.value);
              }}
              required
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
                    atualizar(props.item._id);
                  }
                : cadastrarQuestoes
            }
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalQuestao;
