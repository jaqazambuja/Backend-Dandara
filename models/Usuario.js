const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
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
    eAdmin: {
        type: Number, 
        default: 1
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)