import React, { useState, useEffect } from "react";
import "./App.css";
import AddBook from "./components/AddBook";
import Books from "./components/Books";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [books, SetBooks] = useState([]);

  const [book, setBook] = useState({
    // handleChange ile bu state içi kullanıcı input değerlerini girince doldurulmaktadır.
    bookName: "",
    author: "",
    quantity: "",
    department: "",
    comments: "",
  });

  useEffect(() => {
    fetch("/books")
      .then((res) => {
        // books adresindeki tüm datayı fetch ediyoruz.
        if (res.ok) {
          // Eğer gelen cevap varsa json formatına çevir
          return res.json();
        }
      })
      .then((jsonRes) => SetBooks(jsonRes)); // Json formatına çevrilen datayı books isimli state içerisine atıyoruz.
  });

  const handleChange = (e) => {
    // Burada girilen inputlar yukarıdaki state'e doldurulmaktadır.
    const { name, value } = e.target;
    setBook((prevInput) => {
      return {
        ...prevInput, // Bu şekilde her bir değerin silinmeden state'e gönderilmesi sağlanmaktadır.
        [name]: value,
      };
    });
  };

  const addBook = (e) => {
    e.preventDefault(); // Butona submit etmek için bastığımızda sayfanın yenilenmesini engellemektedir.
    const newBook = {
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity,
      department: book.department,
      comments: book.comments,
    };
    axios.post("/newbook", newBook);
    alert(`The Book ${book.bookName} is added`);
    setBook({
      bookName: "",
      author: "",
      quantity: "",
      department: "",
      comments: "",
    });
  };

  const deleteBook = (id) => { // React tarafından axios kütüphanesi ile Back end'e gönderme yapıyoruz. 
    axios.delete("/delete/" + id);
    alert(`The book with id ${id} is deleted`);
  };

  const lendBook = (id) => {
    axios.put("/lend/" + id);
    alert(`The book with id ${id} is lended`);
  };

  const backBook = (id) => {
    axios.put("/back/" + id);
    alert(`The book with id ${id} is back`);
  };


  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Library
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="addBook">
                    Add Book
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Departments
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        History&Criticism
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Religious
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Music
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Study&Teaching
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Books
              books={books}
              lendBook={lendBook}
              deleteBook={deleteBook}
              backBook={backBook}
            />
          </Route>
          <Route path="/addbook">
            <AddBook
              book={book}
              handleChange={handleChange}
              addBook={addBook}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
