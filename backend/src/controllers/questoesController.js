const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Questoes = require("../models/questoes");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const questoes = await Questoes.find().populate("usuario");

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar questoes" });
  }
});

router.get("/:questoesId", async (req, res) => {
  try {
    const questoes = await Questoes.findById(req.params.questoesId).populate(
      "usuario"
    );

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar questoes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, dividendo,divisor ,datageracao,resultado } = req.body;

    const questoes = await Questoes.create({
      id,
      materia,
      dividendo,
      divisor,
      usuario: req.userId,
      datageracao,
      resultado
    });

    await questoes.save();

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar uma questoes" });
  }
});

router.put("/:questoesId", async (req, res) => {
  try {
    const { id, dividendo,divisor ,datageracao,resultado  } = req.body;

    const questoes = await Questoes.findByIdAndUpdate(
      req.params.questoesId,
      {
        id,
        materia,
        dividendo,
        divisor,
        usuario: req.userId,
        datageracao,
        resultado
      },
      { new: true }
    );

    await questoes.save();

    return res.send({ questoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar questoes" });
  }
});

router.delete("/:questoesId", async (req, res) => {
  try {
    await Questoes.findByIdAndRemove(req.params.questoesId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar questoes" });
  }
});

module.exports = (app) => app.use("/api/questoes", router);
