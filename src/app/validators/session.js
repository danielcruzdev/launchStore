const User = require("../models/User");
const { compare } = require("bcryptjs")

async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.FindOne({ where: { email } });

    if (!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadastrado!"
    });

    const passed = await compare(password, user.password);
    console.log(`PASSED? : ${passed} \n Password: ${password} \n User Password: ${user.password}`)

    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta!"
    });

    req.user = user

    next();

}


module.exports = {
    login
}