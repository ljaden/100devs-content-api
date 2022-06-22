// express
const express = require('express')
const app = express()
const router = express.Router()

// middleware
const multer = require('multer')
const upload = multer()

// database
const Content = require('../../models/contentSchema')

/* ##########          POST ROUTES          ########## */

router.post('/api/post', upload.none(),(req,res) => {
  const data = JSON.parse(req.body.file)

  Content.create(data, (err,result) => {
    if(err) return err
    console.log(data)
    res.redirect('/api/post')
  })
})

module.exports = router