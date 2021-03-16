const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const nodemailer = require("nodemailer");


router.get("/registro", (req, res) => {   
    res.render("usuarios/registro")
})


router.post("/registro",(req,res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome ==null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.username || typeof req.body.username == undefined || req.body.username ==null){
        erros.push({texto: "Username inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha ==null){
        erros.push({texto: "Senha inválido"})
    }

    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }

    /*if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas não coincidem"})
    }*/

    if(erros.length > 0){

        res.render("https://dandara-palmares.netlify.app/cadastrese", {erros: erros})

    }else{

        Usuario.findOne({email: req.body.username}).then((usuario) => {
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com este username no nosso sistema")
                res.redirect("https://dandara-palmares.netlify.app/cadastrese")
            }else{

                const novoUsuario = new Usuario({
                    username: req.body.username,
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    numnis: req.body.numnis,
                    celular: req.body.celular,
                    email: req.body.email,
                    senha: req.body.senha,
                    eAdmin: 1
                })

              
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("erro_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("https://dandara-palmares.netlify.app/")
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() =>{
                            req.flash("sucess_msg", "Usuário criado com sucesso!")
                            res.redirect("https://dandara-palmares.netlify.app/login")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuario, tente novamente!")
                            res.redirect("https://dandara-palmares.netlify.app/")
                        })
                    })
                })

            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
        /*let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user: "projetodandararecode@gmail.com",
                pass: "squad09pro"
            }
        
        });

        transporter.sendMail({
            from:"Dandara <gruponoverecode@gmail.com>",
            to: novoUsuario.email,
            subject: "Email de teste",
            text: "Bem vinda ao projeto Dandara, vamos verificar seus dados e liberaremos seu cadastrao, até mais",
            html: "<a href='https://localhost:3000'>CLique para ir ao Dandara</a>"
        })*/

    }

})

/*router.get("/login", (req,res) => {
    res.render("usuarios/login")
})
*/


router.get("/login", (req,res) => {
    res.render("usuarios/login")
})


//sistema de login
router.post("/login", (req,res,next) => {
//quando autenticado mostra para onde o usuário de ser redirecionado
    passport.authenticate("local", {
        successRedirect: "https://dandara-palmares.netlify.app/minhaconta",
        failureRedirect: "https://dandara-palmares.netlify.app/cadastrese",
        failureFlash: false
    })(req,res,next)
    console.log("logado!")
})

//Sistema de logout 
router.get("/logout", (req,res) => {
    req.logout()
    req.flash('sucess_msg', "Deslogado com sucesso!")
    res.redirect("/")
})

module.exports = router