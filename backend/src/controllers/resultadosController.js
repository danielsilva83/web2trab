const express = require("express");
const authMiddleware = require("../middlewares/auth");


const ResultadosService = require("../services/resultados-service");

const router = express.Router();

router.use(authMiddleware);
const resultados = new ResultadosService();

router.get("/", async (req, res) => {
  return resultados.listarResultados(req, res)
});

router.delete("/:resultadoid", async (req, res) => {
  return resultados.deleteResultado(req, res)
});

module.exports = (app) => app.use("/api/resultados", router);
