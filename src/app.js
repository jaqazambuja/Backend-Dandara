const app = require('express')()
const consign = require('consign')

//carregando modulos
    const express = require('express')
    const bodyParser = require('body-parser') 
    require ('dotenv').config()
    //const Produto = require('./models/Produto')
    //const handlebars = require('express-handlebars');
    const cors = require('cors');
    const mongoose = require("mongoose");

    //const { post } = require('./Config/Server');
    //const app = express();
    const admin = require("./server/routes/admin")
    const session = require('express-session')
    const flash = require("connect-flash")
    //const usuarios = require("./routes/usuario");
    const passport = require('passport');
    //require("./config/auth")(passport)
    require('./database/models/ProdMong')
    const Produto = mongoose.model('produtos');
    //const db = require("./config/db")
    require("./database/models/servicos")
    const cookieParser = require('cookie-parser');
    const path = require('path');
    const Servico = mongoose.model("servicos")
    require("./database/models/user")
    const User = mongoose.model("User")
    



    consign({ verbose: true, locale: 'pt-br', cwd: 'src' })
    .include('middlewares')
    .then('server')
    .into(app)

    //Configurações
    //Sessão
    app.use(session({
        secret: "dandara",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    
    //Middleware
    app.use((req,res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()
    })

    //cookie-parser
    app.use(cookieParser());

    //Body-parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    
    //Cors
    app.use(cors())
    

    app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
      });

    //json

    app.use(express.json());

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb+srv://deploy:dandara123recode@cluster0.j9esr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() =>{
        console.log("MongoDb Conectado a Dandara")
    }).catch((err) =>{
        console.log("Erro ao se conectar ao Mongo: " +err)
    })

    //Rotas
    app.use(cors())

    //rota adminitrativa
    app.use('/admin',admin)
    //app.use("/usuarios", usuarios)



     //retorno dos dados em Json
     app.get("/produtos", async (req,res) => {
        const produtosResponse = await Produto.find()
        const produtosJson = await produtosResponse
        
        return res.json(produtosJson)
    
    })

    app.get("/servicos", async (req,res) => {
        const servicosResponse = await Servico.find()
        const servicosJson = await servicosResponse
        
        return res.json(servicosJson)
    
    })

    //deletando produto   
    app.get('/delete/:id', function(req,res){
    Produto.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("POstagem deletada com sucesso!")
    }).catch(function(erro){
        res.send('Esta postagem não existe')
    })
    })

    //rota do formulario teste
    app.get('/cad', function(req, res){
    res.render('formulario')
    })
    
    //rota do envio dos dados do formulario
    app.post('/addproduto', function(req,res){
    Produto.create({
        username: req.body.username,
        produto: req.body.produto,
        categoria: req.body.categoria,
        imagem: req.body.imagem,
        valor: req.body.valor,
        descricao: req.body.descricao
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro: "+erro)
    })
    
    })

    app.use('/admin', admin)
 




