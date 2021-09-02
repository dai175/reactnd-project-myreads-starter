import React from "react"
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";

class SearchBooks extends React.Component {
  state = {
    books: [],
    value: '',
    bookshelf: {}
  }

  setBookshelf() {
    BooksAPI.getAll()
      .then((books) => {
        let dict = {};
        books.forEach((book) => {
          dict[book.id] = book.shelf;
        });
        this.setState({
          bookshelf: dict
        })
      });
  }

  searchBooks() {
    this.setBookshelf();
    BooksAPI.search(this.state.value)
      .then((books) => {
        if (books && Array.isArray(books)) {
          books.forEach((book) => {
            if (book.id in this.state.bookshelf) {
              book.shelf = this.state.bookshelf[book.id]
            }
          })
        }
        this.setState({
          books: books && Array.isArray(books) ? books : []
        })
      });
  }

  changeValue = (e) => {
    if (e.target.value !== '') {
      this.setState({
        value: e.target.value
      });
      this.searchBooks()
    } else {
      this.setState({
        books: [],
        value: e.target.value
      });
    }
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.searchBooks();
    });
  }

  render() {
    const {books, value} = this.state
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={value}
            onChange={this.changeValue}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                changeShelf={this.changeShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
    );
  }
}

export default SearchBooks;