'use strict'

const express=require('express')
const morgan=require('morgan')
const port= (process.env.PORT) || 3000
const app=express()
const session=require('express-session')
const MySQLStore=require('express-mysql-session')
const {dbconfig}=require('./models/db-conf')

app.set('port',port)

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use(session({
    secret: 'textocualquiera',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbconfig)
}))

//variables globales
app.use((req,res,next)=>{
    //defino variables globales

    next()
})
app.use(require('./routes/authentication'))
app.use(require('./routes/titles'))
app.use(require('./routes/names'))

module.exports=app