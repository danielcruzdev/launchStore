const User = require("../models/User")
const { formatCep, formatCpfCnpj } = require("../../lib/utils")

module.exports = {
    registerForm(req, res) {
        try {
            return res.render('user/register')
        } catch (error) {
            throw new Error(error)
        }
    },
    async show(req, res){
        try {
            
            const { userId: id} = req.session
            const user = await User.FindOne({ where: { id }})

            if(!user) return res.render("user/register", {
                error: "Usuário não encontrado!"
            })

            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)

            return res.render('user/index', { user })
        } catch (error) {
            throw new Error(error)
        }
    },
    async register(req, res) {
        try {
            
            const userId = await User.Create(req.body);

            req.session.userId = userId;

            return res.redirect('/users');

        } catch (error) {
            throw new Error(error);
        }
    }
}