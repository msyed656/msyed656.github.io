const express = require('express');
const router = express.Router();

const Books = require('../models/books.js');


// ROUTES
// index
router.get('/', (req, res)=>{
    Books.find({}, (error, allBooks)=>{
      res.render('index.ejs', {
        books: allBooks
        })
    })
  })
  
  // new
  router.get('/new', (req, res) => {
    res.render('new.ejs');
  })
  
  // post
  router.post('/', (req, res)=>{
    Books.create(req.body, (error, createdFruit)=>{
      res.redirect('/books');
    })
  })
  
  // edit
  router.get('/:id/edit', (req, res)=>{
    Books.findById(req.params.id, (err, foundBooks)=>{ 
        res.render('edit.ejs', 
          { books: foundBooks, 
        })
    })
  })
  
  // update
  router.put('/:id', (req, res)=>{
    
    Books.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
      res.redirect('/books');
    })
  })
  
  // show
  router.get('/:id', (req, res) =>{
    Books.findById(req.params.id, (err, foundBooks)=>{
      res.render('show.ejs', {
        books: foundBooks,
      })
    })
  })
  
  // delete
  router.delete('/:id', (req, res) => {
    Books.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data)=>{
      res.redirect('/books') 
    })
  })


  module.exports = router; 