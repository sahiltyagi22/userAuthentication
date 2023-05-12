const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')


const MongoStore =  require('connect-mongo')(session)

const app = express()

const dbString ='mongodb://127.0.0.1/sessions'
const dbOptions = {
  useNewUrlParser : true,
  useUnifiedTopology : true
}

const connection = mongoose.createConnection(dbString , dbOptions)


app.use(express.json())
app.use(express.urlencoded({extended :true}))

const sessionStore = new MongoStore({
  mongooseConnection : connection,
  collection : 'sessions'
})

app.use(session({
  secret : 'this is the secret',
  resave : false,
  saveUninitialized : true,
  store :sessionStore, 
  cookie :{
    maxAge : 1000 *24 *24 *60
  }
}))

app.get('/', (req,res)=>{

  res.send("<h1> This is the Home Route0</h1>")
  console.log(req.session)

})







app.listen(3000 , ()=>{
  console.log('sever is up and running on port 3000');
})




