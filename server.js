require('dotenv').config()
// express
const express = require('express')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// server static files
app.use(express.static('public'))

// ejs
app.set('view engine', 'ejs')

// database 
const mongoose = require(`${__dirname}/config/db`)
// API routes
app.use(require('./routes/api/gets'))
app.use(require('./routes/api/posts'))


// landing page
app.get('/',(req,res) => {
  res.render('index')
})

// post page
app.get('/api/post', (req,res) => {
  res.render('posts')
})

//
const PORT = process.env.PORT || 8000
app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup')
  console.log(`Listening on PORT: ${PORT}`)
})