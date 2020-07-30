const User = require("../models/User");
const { compare } = require("bcryptjs");
const { date } = require("../../lib/utils");

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.FindOne({ where: { email } });

        if (!user) return res.render("session/login", {
            user: req.body,
            error: "Usuário não cadastrado!"
        });

        const passed = await compare(password, user.password);

        if (!passed) return res.render("session/login", {
            user: req.body,
            error: "Senha incorreta!"
        });

        req.user = user

        next();
    } catch (error) {
        throw new Error(error)
    }


}

async function forgot(req, res, next) {
    try {
        const { email } = req.body

        const user = await User.FindOne({ where: { email } });

        if (!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado!"
        });

        req.user = user

        next();

    } catch (error) {
        throw new Error(error)
    }
}

async function reset(req, res, next) {
    //#region Verifia se o usuário existe
    const { email, password, token, passwordRepeat } = req.body;
    const user = await User.FindOne({ where: { email } });

    if (!user) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não cadastrado!"
    });
    //#endregion
    
    //#region Verificação se a senha é igual
    if (password != passwordRepeat) {
        return res.render("session/password-reset", {
            user: req.body,
            token,
            error: "Senhas diferentes!"
        });
    };
    //#endregion

    //#region Verificação se o token é igual
    if(token != user.reset_token) {
        return res.render('session/password-reset', {
            user: req.token,
            token,
            error: "Token inválido, solicite uma nova recuperação de senha!"
        })
    }
    //#endregion

    //#region Verifica se o token está dentro do prazo de "validade"
    let now = new Date();
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) {
        return res.render('session/password-reset', {
            user: req.token,
            token,
            error: "Token expirado, solicite uma nova recuperação de senha!"
        })
    }
    //#endregion

    req.user = user

    next(); 
}

module.exports = {
    login,
    forgot,
    reset
}