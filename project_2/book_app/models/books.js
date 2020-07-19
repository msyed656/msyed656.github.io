const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  title:  {type: String, required: true },
  author: {type: String, required: true},
  
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books; 