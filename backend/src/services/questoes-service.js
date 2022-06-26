const Questoes = require("../models/questoes");

class questoesService{

    constructor(){
        this.questoesService=[]
    }

    async listarQuestoes(req, res){
    try {
        const questoes = await Questoes.find().populate("usuario");
    
        return res.send({ questoes });
      } catch (err) {
        return res.status(400).send({ error: "Erro ao carregar questoes" });
      }
    }

    async gerarQuestao(req, res){
        
    var n = 0;
 
    try {
        while (n < 10) {
        const { dificuldade, nomeTest } = req.body;
        if( dificuldade == 'facil'){
            dividendo_a= [1, 2, 4]
            divisor_a = [1,2,3,4]
            dividendo_b = [1, 2, 4]
            divisor_b = [1,2,3,4]
            operacao = ['+','-']

            dividendo_a1 = Math.floor(Math.random() * dividendo_a.length);
            dividendo_a = dividendo_a[dividendo_a]
            divisor_a1 = Math.floor(Math.random() * divisor_a1.length);
            divisor_a = divisor_a[divisor_a1]

            operacao1 =  Math.floor(Math.random() * operacao.length);
            operacao = operacao[operacao1]

            dividendo_b1 = Math.floor(Math.random() * dividendo_b.length);
            dividendo_b = dividendo_b[dividendo_b]
            divisor_b1 = Math.floor(Math.random() * divisor_b1.length);
            divisor_b = divisor_b[divisor_b1]

            div_result = divisor_a[divisor_a1]
            if (operacao == '+'){
            dendo_result = dividendo_a + dividendo_b
            }
            if (operacao == '-'){
            dendo_result = dividendo_a - dividendo_b
            }
        }
        if( dificuldade == 'media'){
            dividendo_a= [1, 2, 4, 8, 12]
            divisor_a = [1,2,3,4,5,6]
            dividendo_b = [1, 2, 4, 8, 12]
            divisor_b = [1,2,3,4,5,6]
            operacao = ['+','-']

            dividendo_a1 = Math.floor(Math.random() * dividendo_a.length);
            dividendo_a = dividendo_a[dividendo_a]
            divisor_a1 = Math.floor(Math.random() * divisor_a1.length);
            divisor_a = divisor_a[divisor_a1]

            operacao1 =  Math.floor(Math.random() * operacao.length);
            operacao = operacao[operacao1]

            dividendo_b1 = Math.floor(Math.random() * dividendo_b.length);
            dividendo_b = dividendo_b[dividendo_b]
            divisor_b1 = Math.floor(Math.random() * divisor_b1.length);
            divisor_b = divisor_b[divisor_b1]

            div_result = divisor_a[divisor_a1]
            if (operacao == '+'){
            dendo_result = dividendo_a + dividendo_b
            }
            if (operacao == '-'){
            dendo_result = dividendo_a - dividendo_b
            }
        }
        function calculaMmc(n1, n2) {
            var resto, x, y;
            x = n1;
            y = n2;
            while(resto!=0){
            resto = x % y;
            x = y;
            y = resto;
            }
            return (n1*n2)/x;
        };
        if( dificuldade == 'dificil'){
            dividendo_a= [1, 2, 4, 8, 12, 16, 20, 24, 28,32, 36, 40,46, 48, 56,60]
            divisor_a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
            dividendo_b = [1, 2, 4, 8, 12,13,14,15,16,17,18,19,20]
            divisor_b = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
            operacao = ['+','-']

            dividendo_a1 = Math.floor(Math.random() * dividendo_a.length);
            dividendo_a = dividendo_a[dividendo_a]
            divisor_a1 = Math.floor(Math.random() * divisor_a1.length);
            divisor_a = divisor_a[divisor_a1]

            operacao1 =  Math.floor(Math.random() * operacao.length);
            operacao = operacao[operacao1]

            dividendo_b1 = Math.floor(Math.random() * dividendo_b.length);
            dividendo_b = dividendo_b[dividendo_b]
            divisor_b1 = Math.floor(Math.random() * divisor_b1.length);
            divisor_b = divisor_b[divisor_b1]

            mmc = calculaMmc( divisor_a,divisor_b )
            if (operacao == '+'){
            div_result = mmc
            dendo_result =  ((divisor_a / mmc)* dividendo_a) + ((divisor_b / mmc)* dividendo_b)
            }
            if (operacao == '-'){
            div_result = mmc
            dendo_result =  ((divisor_a / mmc)* dividendo_a) - ((divisor_b / mmc)* dividendo_b)
            }
        }
        // id, dividendo,divisor ,datageracao,resultado
        const questoes = await Questoes.create({
            name_teste: nomeTest,
            dificuldade,
            operacao,
            dividendo_a,
            divisor_a,
            dividendo_b,
            divisor_b,
            usuario: req.userId,
            datageracao: Date.now(),
            dendo_result,
            div_result
        });

        await questoes.save();
        n++;
        listquestoes.append(questoes);
        }
        return res.send({ listquestoes });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao gerar questoes" });
    }
    }
}
module.exports = questoesService