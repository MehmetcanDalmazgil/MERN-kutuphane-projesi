const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const BookStore = require("./models/BookModel");

const app = express();

app.use(bodyParser.json()); // Requst'leri parçalamak için
app.use(cors());

// mongoose connection

mongoose
  .connect(
    // Veri tabanına bağlanma işlemini gerçekleştiriyoruz.
    "mongodb+srv://test:test123@cluster0.45kwj.mongodb.net/books?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("Veri tabanı bağlantısı kuruldu."))
  .catch((err) => console.log(err)); // Bağlandıktan sonra verilecek olan mesaj bilgileri.

app.get("/books", (req, res) => {
  // Veri tabanına post ettiğimiz verileri books sayfasına json formatında get ediyoruz(getiriyoruz).
  BookStore.find().then((books) => res.json(books));
});

app.post("/newbook", async (req, res) => {
  // Veri tabanına yeni bir kitap nesnesini post atıyoruz. (Post Request)
  try {
    const newBook = new BookStore({
      bookName: req.body.bookName,
      author: req.body.author,
      quantity: req.body.quantity,
      department: req.body.department,
      comments: req.body.comments,
    });
    const book = await newBook.save();
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  BookStore.findByIdAndDelete({ _id: id }, (err) => {
    if (!err) {
      console.log("Kitap silindi");
    } else {
      console.log(err);
    }
  });
});

app.put("/lend/:id", async (req, res) => {
  try {
    await BookStore.findByIdAndUpdate(req.params.id, {
      $inc: { quantity: -1 },
    });
  } catch {
    console.log(err);
  }
});

app.put("/back/:id", async (req, res) => {
  try {
    await BookStore.findByIdAndUpdate(req.params.id, {
      $inc: { quantity: 1 },
    });
  } catch {
    console.log(err);
  }
});

//  app.get('/',(req,res) =>{ // Kullanıcı ana sayfaya gelince Hoşgeldin yazısı gönder
//      res.send("Hoşgeldiniz");
//  })

// app.get("/haberler", (req, res) => {

//   res.send("Haberler");
// });

app.listen(5000, () => {
  // Server'ı dinliyoruz.
  console.log("Server bağlantısı kuruldu."); // Çalıştığında verilecek olan mesaj bilgisi.
});
