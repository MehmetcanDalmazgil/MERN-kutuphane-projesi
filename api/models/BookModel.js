const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true, // Mutlaka girilsin
    unique: true,
  },
  author: {
    type: String,
    required: true, // Mutlaka girilsin
  },
  quantity: {
      type: Number,
      required: true,
  },
  department:{
      type: String,
      required: true,
  },
  comments: {
      type: String,
  }
}, {timestamps : true}); // Verinin oluşturulma ve değiştirilme tarihini verecek.

module.exports = mongoose.model("BookStore", bookSchema);