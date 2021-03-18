const mongoose = require('mongoose')

// Chamando a string de importacao do arquivo .env
const { connection_string } = require('../environment/vars')

// Promise que retorna se a conexao esta ok
const conn = () => {
    return mongoose.connect(connection_string, { 
        useNewUrlParser: false,
        useUnifiedTopology: true 
    })
};

module.exports = conn