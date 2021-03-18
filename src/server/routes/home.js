//importando modulos
const router = require('express').Router()
const passport = require('passport')


//rota de teste
module.exports = app => { 
  router.route('/')
    .get((req, res) => res.json({ message: "Rota home" }))
  
  // Adicionando o middleware de autenticação para proteger a rota
  app.use('/home', passport.authenticate('jwt', { session: false }), router)
}