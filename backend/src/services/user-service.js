const User = require("../models/user");
class UserService{
    constructor(){
        this.UserService=[]
    }

    async criarUser(req, res){
        const { email } = req.body;
       
        try {
            if (await User.findOne({ email })) {
              return res.status(400).send({ error: "Email já cadastrado" });
            }
        
            const user = await User.create(req.body);
        
            user.senha = undefined;
        
            return res.send({ user });
          } catch (err) {
            return res.status(400).send({ error: "Falha ao realizar Cadastro" });
          }
    }

}

module.exports = UserService;