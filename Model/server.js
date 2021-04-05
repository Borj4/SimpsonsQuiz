//  Import dependences -----------------------
const express = require('express');
const dotenv = require('dotenv').config();
const server = express();
const mongoose = require('mongoose');
const fs = require('fs-extra');
const cors = require('cors');
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());
    //   .use(cors)
const md5 = require('md5');
const { urlencoded } = require('express');
// const cors = require(`cors`)
const User = require('./modelUsers');
const Questions = require("./modelQuestions") 

// Russian Proof
const cryptoRandomString = require('crypto-random-string');
const jwt = require('jsonwebtoken');
const { async } = require('crypto-random-string');

// Env-y
const port = process.env.PORT || 8080;
url = process.env.MONGO;

// Mongoose first check-----------------------------------------------------------------------------
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;

if(!db)    console.log("No se ha podido contactar con la base de datos");
else       console.log("La base de datos está para lo que le eches");

// Set Regex ----------------------------------------------------------------------------------------
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+=]{8,}$/
function validateEmail(email){
    if (emailPattern.test(email)===true){ return true } else {return false}
}
function validatePass(password){
    if (passPattern.test(password)===true){ return true } else {return false}
}

// API REST --------------------------------------------------------------------------------
// lOGIN & SIGNIN --------------------------------------------------------------------------

// Log In ----------------------------------------------------------------------------------
server.post('/logIn', async (req,res) => {
    console.log(await User.findOne({email:req.body.logEmail}));
    res.send("ojete");
    if (await User.findOne({email:req.body.logEmail}) === null) {
        res.send('Aquí no te conocemos. Vaya usted a registrarse parfavá')
    }
    else (await User.findOne({email:req.body.logEmail}) != null)
        token = jwt.sign({email:req.body.logEmail,loPassword:req.body.logPassword},process.env.TOKEN_SECRET, { expiresIn: '1200s' });

        res.send(window.location.href = "http://127.0.0.1:5500/view/edit.html")
});


// Sign In ----------------------------------------------------------------------------------
server.post('/signIn', async (req,res) => {

if (validateEmail(req.body.signEmail)===false)
{res.send('Por favor, introduce un e-mail de verdad')}

else if (validatePass(req.body.signPassword)===false)
{res.send('Tu contraseña debe contener al menos 8 caracteres, una minúscula y una mayúscula')}

else if (await User.findOne({email:req.body.signEmail}) != null)
{res.send('Ya estás registrado, por favor, dirígete a /logIn')}

else  {  const newUser = new User ({
        email: req.body.signEmail,
        password: md5(req.body.signPassword),
        private: false
        })
        newUser.save();
        if (await User.findOne({email:req.body.signEmail}) != null){
            res.send("Ha habido un problema jodido, prueba más tarde");}
        else(await User.findOne({email:req.body.signPassword}) === null)
            res.send("Estás registradísismo");
        
}})

// QUESTIONS -------------------------------------------------------------------------
// Send Questions to Quiz
server.post('/questions', async (req, res) => {
    res.send( await Questions.find());
})

// Serve questions to front to edit
server.post('/questions', async (req, res) => {

    lasPregunta = Questions.find() // en principio sin argumentos devuelve todo https://masteringjs.io/tutorials/mongoose/find-all
    res.send(lasPregunta) // hay que comprobar que funciona.

})

// Add question ---------------------------------------------------------------------------
server.post('/add', async (req,res,next) => {
    try {
        const newQuestion = new Questions ({
        pregunta: req.body.nuevaPregunta,
        respuestas: [req.body.q0,req.body.q1,req.body.q2,req.body.q3],
        correcta: req.body.number
    })
    newQuestion.save(function(err, newQuestion) {
        if (err) return next(err);
            if (err) return next(err);
           console.log('Question created!');
        res.send('Pregunta creada!')
       
    });
    }
    catch {console.log(`${req.body.pregunta} no se ha guardado`)}
})

// Modify question ------------------------------------------------------------------------
server.post('/mod', async (req,res,next) => {

    const newQuestion = new Questions ({
    pregunta: req.body.nuevaPregunta,
    respuestas: [req.body.q0,req.body.q1,req.body.q2,req.body.q3],
    correcta: req.body.number
    })
    try {

    await Questions.findByIdAndUpdate({_id: req.body.id }, 
            {
            pregunta: req.body.nuevaPregunta,
            respuestas: [req.body.q0,req.body.q1,req.body.q2,req.body.q3],
            correcta: req.body.number
            },
            function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                  res.send(`El resultado de tu modificación es ${result}`);
                }
              }
            );
          }
    
    catch {console.log(`${req.body.id} no se ha guardado`)}
})

// Delete question
server.post('/del', async (req,res,next) => {
await Questions.findByIdAndRemove({_id: req.body.id },
        function (err, result) {
        if (err){
        console.log(err)
        } else {
            console.log("Se ha borrado la pregunta", result);
            res.send('Se ha borrado la pregunta')
        }
        }
)
});

// Ese puerto marinero ------------------------------------------------------------------------------
server.listen(port, function () {
    console.log("El servidor corre que se las pela por el puerto " + port);
});

// mantener el login activo durante la sesión-----------------------------
//  El kit de la cuesión para mantener a una persona logada entre nuestros pechos peludos,
//  es generar un secret en el momento de cada login, que se mantenga en la base de datos
// junto al resto de sus credenciales, hasta el momento en el que se vaya a tomar por culo.

// Una vez que tenemos al jamono logado, cada petición que haga deberá llevar necesariamente
// su JWT en la cabecera de la autorización, así: authorization: dbafnknfjkgjk

// La comprobación del JWT se hace desde su payload, ya que ahí dentro se encuentra el email del jamono.
// req.headers.authorization.length.

// validación con expresiones regulares ------------------------------------
// las expresiones regulares se expresan en una constante: const pattern = /w3schools/ (ha de empezar y terminar con "/")
// var str = "hola mundo";
// luego se testea con function isDate(date){
//                          const patter = /sdfknsf/sfsdnl/g
//                          return pattern.test(date)
//                          }
// /r/n es salto de linea en todos los 
