const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definindo Models de produto com Mongo
const Produto = new Schema({
    username:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    produto: {
        type: String,
        required: true
    },
    /*categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },*/
   /* categoria: {
        type: String
    },*/
    imagem: {
        type: String
       
    },
    valor:{
        type: Number,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

//commit

mongoose.model("produtos", Produto)