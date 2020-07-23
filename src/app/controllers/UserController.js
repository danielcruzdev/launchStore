const User = require("../models/User")

module.exports = {
    registerForm(req, res) {
        try {
            return res.render('user/register')
        } catch (error) {
            throw new Error(error)
        }
    },
    async register(req, res) {
        try {
            
            return res.send("Passou!")

        } catch (error) {
            throw new Error(error)
        }
    }
}