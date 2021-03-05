/*module.exports = function(){

    //Query para retorno de produtos
    this.getProdutos = function(connection, callback){
        connection.query('SELECT username, produto, categoria, valor, descricao, nome, cpf, celular, email, imagem FROM cadastrarprodutos INNER JOIN usuario ON id_usuario = username;',callback)
    }

    //Query para retorno de serviços
    this.getServicos = function(connection, callback){
        connection.query('SELECT username, nome, servico, categoria, valor, descricao, email, celular, imagem FROM cadastrarservico INNER JOIN usuario ON id_usuario = username;',callback)
    }

    //Cadastrando Produtos
    this.postProdutos = function(connection, callback){

        connection.query('INSERT INTO cadastrarprodutos SET?', callback)
    }

    //Cadastrar Serviços
    this.postServicos = function(connection, callback){

        connection.query('INSERT INTO cadastrarservico SET?',callback)
    }


    return this;

}*/