const mongoose = require("../database");

const QuestoesSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  dificuldade: {
    type: String,
    require: true,
  },
  operacao: {
    type: String,
    require: true,
  },
  dividendo_a: {
    type: Number,
    require: true,
  },
  divisor_a: {
    type: Number,
    require: true,
  },
  dividendo_b: {
    type: Number,
    require: true,
  },
  divisor_b: {
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

  div_result: {
    type: Date,
  },
      
  dendo_result: {
    type: Date,
  },
  
});

const Questoes = mongoose.model("Questoes", QuestoesSchema);

module.exports = Questoes;
