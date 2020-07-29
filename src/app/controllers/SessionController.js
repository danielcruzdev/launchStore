const crypto = require("crypto") 
const User = require("../models/User")

module.exports = {
    loginForm(req, res) {
        try {
            return res.render("session/login")
        } catch (error) {
            throw new Error(error)
        }
    },
    login(req, res){
        try {
            req.session.userId = req.user.id
            
            return res.redirect("/users")

        } catch (error) {
            throw new Error(error)
        }
    },
    logout(req, res){
        try {
            req.session.destroy()
        
            return res.redirect("/")

        } catch (error) {
            throw new Error(error)
        }
    },
    forgotForm(req, res){
        try {
            return res.render("session/forgot-password")

        } catch (error) {
            throw new Error(error)
        }
    },
    async forgot(req, res){
        const user = req.user

        const token = crypto.randomBytes(20).toString("hex")

        let expireDate = new Date();

        expireDate = expireDate.setHours(expireDate.getHours() + 1)

        await User.Update(user.Id, {
            reset_token: token,
            reset_token_expires: expireDate
        })
    }
}