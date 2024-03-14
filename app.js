//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require("path")
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


//Configurações
    //Sessao
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    
    app.use(flash())

    //Midleware
    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("success_msg"),
        res.locals.error_msg = req.flash("error_msg"),
        next()
    })


    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }))
    app.set('view engine', 'handlebars');

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(() =>{
        console.log("Conectado ao mongo")
    }).catch((erro) =>{
            console.log("Erro ao se conectar:" + erro)
    })

    //Public
    app.use(express.static(path.join(__dirname,"public")))

    //Midware
    /*
    app.use((req,res,next) =>{
            console.log("Oi eu sou um midware")
            next();
    })
    */

//Rotas
    app.get('/',(req,res)=>{
        res.send('home')
    })

    app.use('/admin', admin)





//Outros
const port = 8081
app.listen(port,() =>{
    console.log("Conectado na porta " + port)
})