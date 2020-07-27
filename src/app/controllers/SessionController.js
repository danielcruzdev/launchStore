
module.exports = {
    loginForm(req, res) {
        try {
            return res.render("session/index")
        } catch (error) {
            throw new Error(error)
        }
    },
    logout(req, res){
        try {
            req.session.destroy();
            return res.redirect("/")

        } catch (error) {
            throw new Error(error)
        }
    }
}