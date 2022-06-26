const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Questoes = require("../models/questoes");
const QuestoesService = require("../services/questoes-service")

const router = express.Router();

router.use(authMiddleware);
var questoes = new QuestoesService()

router.get("/", async (req, res) => {
  return questoes.listarQuestoes(req, res)
});

router.post("/", async (req, res) => {
  return questoes.gerarQuestao(req, res)
});

module.exports = (app) => app.use("/api/questoes", router);
