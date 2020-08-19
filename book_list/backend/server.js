const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3003;



// Database Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Database connection
mongoose.connect('mongodb://localhost:27017/merncrud', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...')
})

// middleware
app.use(express.json()) 

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


// Controllers/Routes
const booksController = require('./controllers/books.js')
app.use('/books', booksController)

// Listen
app.listen(PORT, () => {
  console.log('listening on', PORT)
})