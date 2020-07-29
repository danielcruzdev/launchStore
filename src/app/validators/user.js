const User = require("../models/User");
const { compare } = require("bcryptjs")

function checkAllFields(body){
        //Chegar se todos os fields estão preenchidos
        const keys = Object.keys(body);
        for (key of keys) {
            if (body[key] == "") {
                return {
                    user: body,
                    error: "Preencha todos os campos. Por favor!"
                };
            };
        };
}

async function show(req, res, next) {
    const { userId: id } = req.session
    const user = await User.FindOne({ where: { id } })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado!"
    })

    req.user = user

    next();

}
async function post(req, res, next) {

    //Chegar se todos os fields estão preenchidos
    const fillAllFields = checkAllFields(req.body)
    
    if(fillAllFields) return res.render("user/register", fillAllFields)

    //checar se ja existe um email ou cpf/cnpj já cadastrado!
    let { email, cpf_cnpj, password, passwordRepeat } = req.body;

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

    const user = await User.FindOne({
        where: { email },
        or: { cpf_cnpj }
    });

    if (user) return res.render("user/register", {
        user: req.body,
        error: "Usuário já cadastrado!"
    });

    // chegar se os dois campos de senha são iguais
    if (password != passwordRepeat) {
        return res.render("user/register", {
            user: req.body,
            error: "Senhas diferentes!"
        });
    };

    next();
}
async function update(req, res, next) {
    const fillAllFields = checkAllFields(req.body)
    
    if(fillAllFields) return res.render("user/index", fillAllFields)

    const { id, password } = req.body

    if(!password) return res.render('user/index', {
        user: req.body,
        error: "Coloque sua senha para atualizar seu cadastro!"
    })

    const user = await User.FindOne({ where: {id} })
    const passed = await compare(password, user.password)
    console.log(`PASSED? : ${passed} \n Password: ${password} \n User Password: ${user.password}`)


    if(!passed) return res.render("user/index", {
        user: req.body,
        error: "Senha incorreta!"
    })

    req.user = user

    next();
}



module.exports = {
    post,
    show,
    update
}