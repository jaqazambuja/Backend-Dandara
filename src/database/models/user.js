const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Model para cadastrar usuarios.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    numnis: {
        type: Number,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

// Chamei o metodo compare para comparar a senha que o usuario usa quando faz login, com a senha 
// que foi cadasrada por ele, utilizo esse metodo por conta do hash nas senhas.
userSchema.method('compare', async (formPass, userPass) => { 
    return bcrypt.compare(formPass, userPass)
})

// Model criado
const User = mongoose.model("User", userSchema)

module.exports = User