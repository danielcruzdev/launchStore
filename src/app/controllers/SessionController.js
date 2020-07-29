
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
    }
}