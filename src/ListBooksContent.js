import React from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";

class ListBooksContent extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => this.getBooks());
  }

  render() {
    const {books} = this.state

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf
            books={books}
            shelf="currentlyReading"
            title="Currently Reading"
            changeShelf={this.changeShelf}
          />
          <Bookshelf
            books={books}
            shelf="wantToRead"
            title="Want To Read"
            changeShelf={this.changeShelf}
          />
          <Bookshelf
            books={books}
            shelf="read"
            title="Read"
            changeShelf={this.changeShelf}
          />
        </div>
      </div>
    );
  }
}

export default ListBooksContent;