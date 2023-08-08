// const { response } = require('express')
const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/'));

app.get('/', (req, res)=>{
    res.redirect("/get-started")
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

app.get('/get-started', (req, res)=>{
    res.sendFile(__dirname + '/landingpage.html');
})

app.get('/addTodo', (req, res)=>{
    res.sendFile(__dirname + '/addTodo.html');
})

app.get('/Todo', (req, res)=>{
    res.sendFile(__dirname + '/todo.html');
})


app.listen(port, () => {
    console.log("The Server Is Up And Running.......")
})