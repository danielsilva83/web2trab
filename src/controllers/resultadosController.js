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
    return res.status(400).send({ error: "Erro ao carregar resultados" });
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
