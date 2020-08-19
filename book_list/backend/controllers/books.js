const express = require('express')
const books = express.Router()
const Book = require('../models/books.js')

books.post('/', async (req, res) => {
  Book.create(req.body, (error, createdBook) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).send(createdBook) 
  })
})

books.get('/', (req, res) => {
  Book.find({}, (err, foundBooks) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundBooks)
  })
})

books.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedBook)
  })
})

books.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBook) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedBook)
  })
})

module.exports = books



