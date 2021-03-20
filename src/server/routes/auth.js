const router = require('express').Router()
const User = require('../../database/models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10
require('dotenv').config()
const jwt = require("jsonwebtoken")
const { secretKey } = require('../../environment/vars')

module.exports = app => {     
    router.post("/login", (req, res, next) => { 
        passport.authenticate('local', 
            { session: false }, 
            (err, user, info) => { 
                if (err) { 
                    return res.status(500).json({ err })
                }

                if (!user) { 
                    const { message } = info
                    return res.status(401).json({ message })
                }
                
                // Se tiver usuario no banco ele recebe um token que dura 1 hora, 
                //depois disso ele precisa logar novamente
                
                const { _id } = user
                const token = jwt.sign({ _id }, secretKey, { expiresIn: '1h' })

                res.cookie('jwt', token, { 
                    domain: 'https://dandara-palmares.netlify.app/',
                    path: '/',
                    httpOnly: false, 
                    secure: false
                })
                .status(200)
                .redirect("https://dandara-palmares.netlify.app/minhaconta")
            })(req, res, next)
    })
    
    router.post("/register", (req, res) => { 
        const { username, nome, cpf, numnis, celular, email, senha } = req.body

        // Senha é criptografada e o usuário fica cadastrado no banco
        bcrypt.hash(senha, saltRounds)
            .then(async (hash) => {
                await User.create({ username, nome, cpf, numnis, celular, email, senha: hash }, (err, newUser) => { 
                    if (err) { 
                        console.log(err)
                        return res.status(400).json({ error: "Usuario ja existe" })
                    }
        
                    return res.redirect("https://dandara-palmares.netlify.app/minhaconta")
                    
                })
            })
    })

    app.use("/auth", router)
}