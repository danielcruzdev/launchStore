module.exports = {
    async registerForm(req, res) {
        try {
            return res.render('user/register')
        } catch (error) {
            throw new Error(error)
        }
    }
}