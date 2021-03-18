// importando os modulos
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

//Importar models para consultar se o usuario esta cadastrado
//no banco de dados
const User = require('../database/models/user')
const ObjectId = require('mongoose').ObjectId

// Importando a secret key para poder assinar o token
const { secretKey } = require('../environment/vars')

// Estrategia recebe o post do formulario de login
// No body da requisicao tem username e senha
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'senha'
    },
    async function (username, senha, done) { 

        // O Middlware verifica se o usuário existe no banco de dados
        await User.findOne({ username }, (err, user) => { 
            if (err) {
                return done(err)
            }

            // Se não existir, retorna false ("Não autorizado!")
            if (!user) { 
                return done(null, false, { message: "Usuario nao existe" })
            }

            // Se existir, verifica se a senha informada está correta
            user.compare(senha, user.senha)
                .then(match => { 

                    // Se não estiver, retorna false ("Não autorizado!")
                    if (!match) {
                        return done(null, false, { message: 'Senha incorreta' })
                    }
        
                    // Se sim, ele vai retornar as infos do usuario cadastrado para poder gerar o token 
                    return done(null, user)
                })
        })
    }
))

// Definicao das funcoes para sessao
passport.serializeUser((user, done) => { 
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => { 
    await User.findById({ _id: ObjectId(id) }, (err, user) => { 
        done(err, user)
    })
})

// Envio do token no header da requisicao 
const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

// O middleware extrai o token do Header
// e verifica se ele é válido. Se o token estiver expirado ele retorna false
passport.use(new JwtStrategy(opts, async (payload, done) => { 
    await User.findOne({ _id: payload._id }, (err, user) => {         
        if (err) { 
            return done(err, false)
        }

        if (!user) { 
            return done(null, false)
        }

        return done(null, { id: user._id })
    })
}))


// Retorno do middleware
module.exports = app => { 
    app.use(passport.initialize())
}