const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true}
 

})

module.exports = mongoose.model('Book', booksSchema)