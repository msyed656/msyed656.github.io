const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// middleware to help with the form submission
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// mongoose connection logic
mongoose.connect('mongodb://localhost:27017/basiccrud', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// using controller file
const booksController = require('./controller/books.js');
app.use('/books', booksController);

// the app running the server
app.listen(3000, () => {
  console.log('listening')
})