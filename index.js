const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// connection to mongodb
mongoose.connect('mongodb+srv://admin:<password>@cluster0.2dfke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Book=require('./model');

app.post('/book', async(req, res) => {
    
    // const book = req.body;

    const new_book = new Book(req.body)
    new_book.save(function(err, book) {
        if (err)
          res.send(err);
        res.json(book);
      });
});

app.get('/books', async(req, res) => {
    const allBook=await Book.find();
    console.log(allBook)
    res.json(allBook);
});

app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const bookId = req.params.isbn;

    Book.findById(bookId, function(err, book) {
        if (err)
          res.send(err);
        res.json(book);
      });

});

app.delete('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const bookId = req.params.isbn;

    Book.remove({
        _id: bookId
      }, function(err, book) {
        if (err)
          res.send(err);
        res.json({ message: 'Book successfully deleted' });
      });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
