const User = require("../models/User")

async function post(req, res, next) {

    //Chegar se todos os fields estão preenchidos
    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor preencha todos os campos!");
        }
    }
    //chegar se ja existe um email ou cpf/cnpj já cadastrado
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.FindOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.send("Usuario já existe!")

    // chegar se os dois campos de senha são iguais
    if (password != passwordRepeat) {
        return res.send("Senhas não são iguais!")
    }

    next()
}

module.exports = {
    post
}