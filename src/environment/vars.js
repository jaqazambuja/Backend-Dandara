// Variaveis de ambiente defidas no arquivo .env
const { CONNECTION_STRING, PORT, SECRET_KEY } = process.env

require('dotenv').config()
module.exports = { 
    connection_string: CONNECTION_STRING,
    port: PORT,
    secretKey: SECRET_KEY
}