const User = require("../models/User")

module.exports = {
    registerForm(req, res) {
        try {
            return res.render('user/register')
        } catch (error) {
            throw new Error(error)
        }
    },
    show(req, res){
        try {
            return res.send('OK! Cadastrado!')
        } catch (error) {
            throw new Error(error)
        }
    },
    async register(req, res) {
        try {
            
            const userId = await User.Create(req.body)

            return res.redirect('/users')

        } catch (error) {
            throw new Error(error)
        }
    }
}