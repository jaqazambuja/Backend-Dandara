
// Variaveis de ambiente
const { port } = require('../environment/vars')

// Conexao com o banco de dados no Atlas
const conn = require('../database/connection')

module.exports = app => { 
 conn()
 .then(async () => { 
   console.log(`\nConectado ao mongoDB`)  
    
   app.listen(port, () => { 
    console.log(`Server rodando na porta ${ port }`)
   })
 })
 .catch(error => { 
    console.log(error)
 }) 
}