export default email => {
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
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
    to:"leonardo_clepardi@outlook.com",
    subject: "Email de teste",
    text: "funcionou",
    html: "<a href='https://localhost:3000'>CLique para ir ao Dandara</a>"
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err)
})
}