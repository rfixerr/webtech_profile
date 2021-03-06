const express = require("express") //declaram variabila express si includem modulul express
const Sequelize = require("sequelize")

const app = express() //apelez functia de mai sus

//(database, user, pass, properties)
const sequelize = new Sequelize('profile','root','',{
    dialect: 'mysql',
    host:'localhost'
})


sequelize.authenticate().then(function(){
    console.log('success');
}).catch(function(){
    console.log("There was an error connecting to the DB")
})

const Messages = sequelize.define('messages',{
    name:Sequelize.STRING,
    subject:Sequelize.STRING,
    message:Sequelize.TEXT
})

app.get('/createdb',function(request,response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('Tables created')
    }).catch(function(){
        response.status(200).send('Could not create tables')
    })
})

app.use('/',express.static('static')) 


let messages = [
    {
        subject : "Message",
        message : "Hello no 2"
    },
    {
         subject : "Winter",
        message : "Winter is coming"
    }
    ]

app.get('/hello',function(request,response){
    console.log(request)
    let name = request.query.name
    let email = request.query.email 
    response.status(200).send('Hello '+ name + '!' + ' You registered with the email '+email);
})


//will return a list of all messages
app.get('/messages', (request,response) => {
    Messages.findAll().then((messages) => {
        response.status(200).json(messages)
    })
})

app.get('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

//to be able to read JSON body
app.use(express.json())
app.use(express.urlencoded())

app.post('/messages', (request,response) => {
    Messages.create(request.body).then((message) =>
    {
        response.status(201).json(message)
    })
})

app.put('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

app.delete('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

app.listen(8080)