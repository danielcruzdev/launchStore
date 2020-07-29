const User = require("../models/User");
const { compare } = require("bcryptjs")

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.FindOne({ where: { email } });
    
        if (!user) return res.render("session/login", {
            user: req.body,
            error: "Usuário não cadastrado!"
        });
    
        const passed = await compare(password, user.password);
    
        if(!passed) return res.render("session/login", {
            user: req.body,
            error: "Senha incorreta!"
        });
    
        req.user = user
    
        next();
    } catch (error) {
        throw new Error(error)
    }


}

async function forgot(req, res, next){
    try {
        const { email } = req.body

        const user = await User.FindOne({ where: { email } });
    
        if (!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado!"
        });

        req.user = user

        
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    login,
    forgot
}