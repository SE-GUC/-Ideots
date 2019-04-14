const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();
//view
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname,'public')));



//body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req,res) =>{
res.render('contact');
});

app.post('/send',(_req,res)=>{
const output =`
<p>You have a new contact request</p>
<h3>Contact Details</h3>
<ul>
<li>Name: ${_req.body.name}</li>
<li>Company: ${_req.body.company}</li>
<li>Email: ${_req.body.email}</li>
<li>Phone: ${_req.body.phone}</li>    
</ul>
<h3>Message</h3>
<p>${_req.body.message}</p>
`;


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "mail.lirtenhub.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'test@lirtenhub.com', // generated ethereal user
    pass: '123abc' // generated ethereal password
  },
  tls:{
      rejectUnauthorized:false
  }
});

// send mail with defined transport object
let mailOptions = {
  from: '"Nodemailer Contact" <test@lirtenhub.com>', // sender address
  to: 'adardir01@gmail.com', // list of receivers
  subject: "request", // Subject line
  text: "Hello world?", // plain text body
  html: output // html body
};
transporter.sendMail(mailOptions,(error, info) => {
    if(error){
        return console.log(error);
    }

console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

res.render('contact',{msg:'Email has been sent'});

});
});
app.listen(3000,()=>console.log('server started at port 3000'));