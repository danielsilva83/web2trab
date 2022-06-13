const mongoose = require("../database");

const ResultadosSchema = new mongoose.Schema({
  descricao: {
    type: String,
    require: true,
  },
  acertos: {
    type: Number,
    require: true,
  },
  erros: {
    type: Number,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const Resultados = mongoose.model("Resultados", ResultadosSchema);

module.exports = Resultados;
