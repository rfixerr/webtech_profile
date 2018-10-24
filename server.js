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

app.get('/messages', (request,response) => {
    if(request.query.search != undefined){
        let filteredMessages = [];
        for(var i=0;i < messages.length;i++){
            if(messages[i].message.includes(request.query.search)){
                filteredMessages.push(messages[i])
            }
        }
        response.status(200).json(filteredMessages)
    }
    else{
        response.status(200).json(messages);
        
    }
})

app.get('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

app.post('/messages', (request,response) => {
    response.status(200).send("Not implemented");
})

app.put('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

app.delete('/messages/:id', (request,response) => {
    response.status(200).send("Not implemented");
})

app.listen(8080)