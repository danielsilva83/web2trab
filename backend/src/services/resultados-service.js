const Resultados = require("../models/resultados");
class resultadosService{
  constructor(){
    this.resultadosService=[]
  }
    async listarResultados(req, res){
    try {
        const resultados = await Resultados.find().populate("usuario");
    
        return res.send({ resultados });
      } catch (err) {
        return res.status(400).send({ error: "Erro ao carregar resultados" });
      }
    }
    
    async deleteResultado(req, res){
    try {
        await Resultados.findByIdAndRemove(req.params.resultadoid);
    
        return res.send();
      } catch (err) {
        return res.status(400).send({ error: "Erro ao deletar resultado" });
      }
    }

}
module.exports = resultadosService