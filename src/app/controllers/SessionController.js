const crypto = require("crypto")
const User = require("../models/User")
const mailer = require("../../lib/mailer")
const { hash } = require('bcryptjs')
const { has } = require("browser-sync")

module.exports = {
    loginForm(req, res) {
        try {
            return res.render("session/login")
        } catch (error) {
            throw new Error(error)
        }
    },
    login(req, res) {
        try {
            req.session.userId = req.user.id

            return res.redirect("/users")

        } catch (error) {
            throw new Error(error)
        }
    },
    logout(req, res) {
        try {
            req.session.destroy()

            return res.redirect("/")

        } catch (error) {
            throw new Error(error)
        }
    },
    forgotForm(req, res) {
        try {
            return res.render("session/forgot-password")

        } catch (error) {
            throw new Error(error)
        }
    },
    async forgot(req, res) {
        const user = req.user
        
        try {

            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date();

            now = now.setHours(now.getHours() + 1)

            await User.Update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.transport.sendMail({
                to: user.email,
                from: 'no-replay@launchstore.com.br',
                subject: "Recuperação de senha!",
                html: ` 
                <h2>Perdeu a chave?</h2>
                <p> Não se preocupe, clique no link abaixo para recuperar sua senha!</p>
                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                </p> 
          `
            })

            return res.render("session/forgot-password", {
                sucess: `Verifique seu e-mail para resetar sua senha!`
            })
        } catch (error) {
            console.log(error)
            return res.render("session/forgot-password", {
                error: `Erro inesperado, tente novamente!`
            })
        }

    },
    resetForm(req, res){
        try {
            return res.render('session/password-reset', { token: req.query.token })
        } catch (error) {
            throw new Error(error)
        }
    },
    async reset(req, res) {
        try {
            const { password, token } = req.body
            const user = req.user

            //#region Criando um novo hash de senha
            const newPassword = await hash(password, 8)
            //#endregion

            //#region Atualizar usuário
            await User.Update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })
            //#endregion

            //#region Avisa o usuário da alteração
            return res.render("session/login", {
                user: req.body,
                success: "Senha atualizada com sucesso!"
            })
            //#endregion

        } catch (error) {
            console.log(error)
            return res.render("session/password-reset", {
                user: req.body,
                token,
                error: `Erro inesperado, tente novamente!`
            })
        }
    }
}