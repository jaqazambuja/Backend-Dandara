//Carregando Modulos
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')
    const { createPoolCluster } = require('mysql')
    require('../../database/models/categorias')
    const Categoria = mongoose.model('categorias')
    require('../../database/models/ProdMong')
    const Produto = mongoose.model('produtos');
    require('../../database/models/servicos')
    const Servico = mongoose.model('servicos')
    const multer = require('multer')
    const cors = require('cors');

    const storage = multer.diskStorage({
        destination: function(req,res,cb){
            cb(null,"uploads/")
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }

    })

    const upload = multer({storage})

//Rotas do Admin
router.use(cors({origin: "http://localhost:3000", 
credentials: true}))

    //Rota index, apenas para testes
        router.get('/', (req,res) => {
            res.render("admin/index")
        })

    //Rota que retorna as Categorias cadastradas no formato JSON
        router.get('/categorias', async (req,res) => {
            const categoriasResponse = await Categoria.find()
            const categoriasJson = await categoriasResponse
            
            return res.json(categoriasJson)
            
        })

    //Rota para o formulário teste de add Categoria
        router.get('/categorias/add', (req,res) => {
            res.render("admin/addcategorias")
        })

    //rota para criar categorias
        router.post('/categorias/nova', (req,res) => {
        
    
            const novaCategoria ={
                nome: req.body.nome,
                slug: req.body.slug
            }

            new Categoria(novaCategoria).save().then(() => {
                console.log("Categoria cadastrada com sucesso")
            }).catch((err) => {
                console.log("Erro ao cadastrar a nova categoria")
            })
            

        })

    //Rota para editar categoria
        router.put("/categorias/:id", async(req,res) =>{
            const {id} = req.params;
            const categoria = await Categoria.findOne({_id: id});

            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save();

            res.json({message: "categoria editada"})
        })

    //Pota para deletar categoria
        router.delete('/categorias/delete/:id', async(req,res)=>{
            const{id} = req.params;
            await Categoria.findOneAndDelete({_id:id});

            res.json({message:"Categoria Deletada"});
        })

    //Rota para retornar produtos cadastrados em Json
        router.get("/produtos", async (req,res) => {
            const produtosResponse = await Produto.find().populate("username")
            const produtosJson = await produtosResponse
            
            return res.json(produtosJson)
        
        })

        router.get("/produtos/:id", async (req,res) => {
            const {id} = req.params;
            const produtosResponse = await Produto.findOne({_id: id})
            const produtosJson = await produtosResponse
            
            return res.json(produtosJson)
        
        })

    //Rota para cadastrar Produtos
        router.post("/produtos/cad",upload.single("file"), (req,res) =>{

                const novoProduto = {
                    username: req.body.username,
                    produto: req.body.produto,
                    categoria: req.body.categoria,
                    imagem: req.body.imagem,
                    valor: req.body.valor,
                    descricao: req.body.descricao
                }

                new Produto(novoProduto).save().then(()=> {
                console.log("Produto cadastrado") 
                }).catch((err) =>{
                    console.log(err)
                })
            

        })
    //Rota para alterar produtos
        router.put("/produtos/:id", async(req,res) =>{
            const {id} = req.params;
            const produto = await Produto.findOne({_id: id});
            produto.username = req.body.username;
            produto.produto = req.body.produto;
            produto.categoria = req.body.categoria;
            //produto.imagem = req.body.imagem;
            produto.valor = req.body.valor;
            produto.descricao = req.body.descricao
            produto.save();

            res.json({message: "produto editado"})
        })
    
    //Rota para deletar Produto
        router.delete('/produtos/delete/:id', async(req,res)=>{
            const{id} = req.params;
            await Produto.findOneAndDelete({_id:id});

            res.json({message:"Produto Deletado"});
        })
    
    //Rota para retornar servicos cadastrados em Json
    router.get("/servicos", async (req,res) => {
        const servicosResponse = await Servico.find()
        const servicosJson = await servicosResponse
        
        return res.json(servicosJson)
    })
    //Rota para cadastrar Servicos
    router.post("/servicos/cad",upload.single("file"), (req,res) =>{

            const novoServico = {
                username: req.body.username,
                servico: req.body.servico,
                categoria: req.body.categoria,
                imagem: req.body.imagem,
                valor: req.body.valor,
                descricao: req.body.descricao
            }

            new Servico(novoServico).save().then(()=> {
            console.log("Servico cadastrado") 
            }).catch((err) =>{
                console.log(err)
            })
        

    })

    //Rota para alterar Servicos
    router.put("/servicos/:id", async(req,res) =>{
        const {id} = req.params;
        const servico = await servico.findOne({_id: id});
        servico.username = req.body.username;
        servico.servico = req.body.servico;
        servico.categoria = req.body.categoria;
        //servico.imagem = req.body.imagem;
        servico.valor = req.body.valor;
        servico.descricao = req.body.descricao
        servico.save();

        res.json({message: "servico editado"})
    })
    //Rota para deletar Servico
    router.delete('/servicos/delete/:id', async(req,res)=>{
        const{id} = req.params;
        await Servico.findOneAndDelete({_id:id});

        res.json({message:"servico Deletado"});
    })
//exportação do modulo
module.exports = app => {
    app.use('/admin', router)
}

