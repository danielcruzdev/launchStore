const User = require("../models/User")

async function post(req, res, next) {

    //Chegar se todos os fields estão preenchidos
    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "") {
            return res.render("user/register", {
                user: req.body,
                error: "Preencha todos os campos. Por favor!"
            })
        }
    }
    //chegar se ja existe um email ou cpf/cnpj já cadastrado
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.FindOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.render("user/register", {
        user: req.body,
        error: "Usuário já cadastrado!"
    })

    // chegar se os dois campos de senha são iguais
    if (password != passwordRepeat) {
        return res.render("user/register", {
            user: req.body,
            error: "Senhas diferentes!"
        })
    }

    next()
}

module.exports = {
    post
}