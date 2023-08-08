const mongoose = require("mongoose")
const User = require('./User')
const Todo = require('./Todo')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const bcrypt = require("bcrypt")
const salt = 10
const request = require('request');
app.use(
    cors({
        origin: '*'
    })
    )
    
    mongoose.connect("mongodb://localhost:27017/TodoList")
    app.use(express.json())
    
    
let userReturn = ''

app.post('/registeruser', async (req, res)=>{
    let userName = req.body.name
    let userEmail = req.body.email
    let userPassword = req.body.password

    
    let saveuser = async (userName, userEmail, userPassword)=>{
        let hash = await bcrypt.hash(userPassword, salt);
        const user = await User.findOne({name: userName})
        const email = await User.findOne({email: userEmail})
        if (user == null){
            if (email == null){
                const user = new User({ name: userName, email: userEmail, password: hash})
                user.save().then(()=>{res.send("Succesfully Registered")})
            }else{
                res.status(200).send("Your Email Already Exist's")
            }
        }else{
            res.status(200).send("Your Username Already Exist's")
        }
    }
    saveuser(userName, userEmail, userPassword)
})

app.post('/loginuser', (req, res)=>{
    let userName = req.body.name
    let userPassword = req.body.password
    let saveuser = async (userName, userPassword)=>{
        const user = await User.findOne({name: userName})
        if (user != null){
            let hash = user.password
            let compared = await bcrypt.compare(userPassword, hash);
            if (compared == true){
                res.send("Succesfully Logged In")
                userReturn = user.name
            }else{
                res.send("Wrong Password")
            }
        }
        else if (user == null){
            res.send("Could Not Find The Username In Database")
        }
    }
    saveuser(userName, userPassword)
})

app.post('/addTodo', (req, res)=>{
    let accountName = userReturn
    let userTitle = req.body.title
    let userDescription = req.body.description
    let userAuthor = req.body.author
    let userPriorty = req.body.priorty
    let addTodo = async (accountName, title, description, author, priorty) => {
        const todo = new Todo({ account: accountName, title: title, description: description, Author: author, Priorty: priorty})
        todo.save().then(res.send("todo saved"))
    }
    addTodo(accountName, userTitle, userDescription, userAuthor, userPriorty)
})

app.get('/getQuote', (req, res)=>{
    var category = 'happiness';
    request.get({
      url: 'https://api.api-ninjas.com/v1/quotes?category=happiness',
      headers: {
        'X-Api-Key': 'O5hbwotukFWX3vBu9LW5tw==Q8teoWXdFng6bm35'
      },
    }, function(error, response, body) {
      if(error) return console.error('Request failed:', error);
      else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      else{
        res.send(body)
      }
    });
})

app.get('/getNewWord', (req, res) => {
    request.get({
        url: 'https://api.api-ninjas.com/v1/randomword',
        headers: {
          'X-Api-Key': 'O5hbwotukFWX3vBu9LW5tw==Q8teoWXdFng6bm35'
        },
      }, function(error, responsee, body) {
        if(error) return console.error('Request failed:', error);
        else if(responsee.statusCode != 200) return console.error('Error:', responsee.statusCode, body.toString('utf8'));
        else{
            let response1 = JSON.parse(responsee.body)
            let word = response1.word
            request.get({
                url: 'https://api.api-ninjas.com/v1/dictionary?word=' + word,
                headers: {
                  'X-Api-Key': 'O5hbwotukFWX3vBu9LW5tw==Q8teoWXdFng6bm35'
                },
              }, function(error, response, body) {
                if(error) return console.error('Request failed:', error);
                else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                else res.send(body)
              });
        }
    })
})

app.post('/returnuser', async (req, res)=>{
    res.send(userReturn)
})

app.get('/getTodos', async (req, res) => {
    const todos = await Todo.find({account: userReturn})
    let emptyArray = []
    todos.forEach(element => {
        let el = JSON.stringify(element)
        let replaced = el.replace('_id', 'id')
        let r1 = JSON.parse(replaced)
        emptyArray.push(r1)
    });
    if (emptyArray.length === 0){
        res.send("No Todos")
    }else{
        res.send(emptyArray)
    }
})

app.post('/deleteTodo', async (req, res) => {
    let stringifiedString = JSON.stringify(req.body)
    let parsedString = JSON.parse(stringifiedString)
    let userShippedTitle = parsedString.title
    const todos = await Todo.findOneAndDelete({title: userShippedTitle})
    res.send("Todo Was Successfully Deleted")
})


app.post('/markAsDone', async (req, res) => {
    let stringifiedString = JSON.stringify(req.body)
    let parsedString = JSON.parse(stringifiedString)
    let userShippedTitle = parsedString.title
    const todos = await Todo.findOneAndDelete({title: userShippedTitle})
    res.send("Todo Was Successfully Mark As Done!")
})
app.listen(port, ()=>{
    console.log("The Backend Is Up And Functional")
})