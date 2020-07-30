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
            const { user } = req

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
    },
    async update(req, res) {
        try {
            const { user } = req;
            let { name, email, cpf_cnpj, cep, address } = req.body;

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
            cep = cep.replace(/\D/g, "");

            await User.Update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            });

            return res.render('user/index', {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            });
        } catch (error) {
            console.log(error)
            return res.render('user/index', {
                error: "Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res){
        try {
            await User.Delete(req.body.id)

            req.session.destroy()

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })
        } catch (error) {
            console.log(error)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta!"
            })
        }
    }
}