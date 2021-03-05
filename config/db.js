if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://deploy:dandara123recode@cluster0.j9esr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}
}//else{
    //module.exports = {mongoURI: "mongodb://localhost/dandara"}
//}