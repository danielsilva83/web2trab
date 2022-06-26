const User = require("../models/user");

class loginsService{
    constructor(){
        this.loginsService=[]
    }

    async login(req, res){
        const { email, senha } = req.body;
        const user = await User.findOne({ email }).select("+senha");
    
        if (!user) {
        return res.status(400).send({ error: "Email não encontrado" });
        }
        if (!(await bcrypt.compare(senha, user.senha))) {
        return res.status(400).send({ error: "Senha incorreta" });
        }
    
        user.senha = undefined;
    
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
        });
    
        res.send({ user, token });
    }
}
module.exports = loginsService