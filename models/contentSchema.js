const mongoose = require('mongoose')

// Database Schema -- content
const contentSchema = new mongoose.Schema({
  id: String,
  message: String,
  attachments: [
    {
      id: String,
      filename: String,
      size: Number,
      url: String,
      proxy_url: String,
      content_type: String
    }
  ],
  timestamp: String,
  content: {
    id: String,
    classNum: String,
    checkin: String,
    title: String,
    vod: String,
    slides: String,
    homework: [
      {
        task: String,
        link: String
      }
    ],
    extra: [
      {
        name: String,
        link: String
      }
    ]
  }
})

// Model -- content
const Content = mongoose.model('Content', contentSchema)

// export Content Model
module.exports = Content