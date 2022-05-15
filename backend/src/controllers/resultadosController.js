const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Resultados = require("../models/resultados");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const resultados = await Resultados.find().populate("usuario");

    return res.send({ resultados });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar anotações" });
  }
});

router.get("/:resultadoid", async (req, res) => {
  try {
    const questoes = await Resultados.findById(req.params.resultadoid).populate(
      "usuario"
    );

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar resultado" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {  descricao, acertos, erros, data  } = req.body;

    const questoes = await Resultados.create({
      descricao,
      acertos,
      erros,
      data,
      usuario: req.userId,
    });

    await questoes.save();

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar uma resultado" });
  }
});

router.put("/:resultadoid", async (req, res) => {
  try {
    const { descricao, acertos, erros, data } = req.body;

    const questoes = await Resultados.findByIdAndUpdate(
      req.params.resultadoid,
      {
        descricao,
        acertos,
        erros,
        data,
      },
      { new: true }
    );

    await questoes.save();

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar resultado" });
  }
});

router.delete("/:resultadoid", async (req, res) => {
  try {
    await Resultados.findByIdAndRemove(req.params.resultadoid);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar resultado" });
  }
});

module.exports = (app) => app.use("/api/resultados", router);
