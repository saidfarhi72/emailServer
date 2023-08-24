"use strict";
const nodemailer = require("nodemailer");
const cors = require("cors");
const express= require("express");
const bodyParser = require('body-parser');

require('dotenv').config()



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

app.post('/', (req, res) =>     

{
    console.log("ji")
    try{

        console.log(req.body)
        const { name, email, message } = req.body;
        const transporter = nodemailer.createTransport({
        
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            
            tls: {
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: 'Message from potfolio',
            
            html:message
          };
        transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                  console.log(error);
                } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.send("success")
    }catch(error){
        console.log(error)
        res.send("fail")

    }


}
)






app.listen(4000, () => {
    console.log(`listening on *:4000`);
}
)
