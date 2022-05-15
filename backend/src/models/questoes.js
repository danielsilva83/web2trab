const mongoose = require("../database");

const QuestoesSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  dividendo: {
    type: Number,
    require: true,
  },
  divisor: {
    type: Number,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  datageracao: {
    type: Date,
  },
  resultado: {
    type: Date,
    default: Date.now,
  },
  
});

const Questoes = mongoose.model("Questoes", QuestoesSchema);

module.exports = Questoes;
