// express
const express = require('express')
const app = express()
const router = express.Router()

// DB model
const Content = require('../../models/contentSchema')

// handling middleware
app.use(express.json()) //json
app.use(express.urlencoded({extended:false}))

/* ##########          GET ROUTES          ########## */

// GET ALL -- class
router.get('/api/class', (req,res) => {
  // GET - returns all class data
  Content.find({},((error,results) => {
    if(error) return res.sendStatus(404)
    // 
    res.send(results)
  }))
})

// GET SPECIFIC -- class/:classNum
router.get('/api/class/:classNum', (req,res) => {
  const classNum = req.params.classNum.length === 1? `0${req.params.classNum}`:req.params.classNum 

  Content.findOne({"content.classNum":classNum}, (error,result) => {
    if(error) return res.sendStatus(404)
    // 
    res.send(result)
  })
})

// GET SPECIFIC -- class/:classNum/:category
router.get('/api/class/:classNum/:category', (req,res) => {
  const classNum = req.params.classNum.length === 1? `0${req.params.classNum}`:req.params.classNum 

  const category = req.params.category

  Content.findOne({"content.classNum":classNum},(err, result) => {

    if(result !== null){
      res.send(result.content[`${category}`])
    } else {
      res.send({Error: null})
    }
    
  })
})

module.exports = router