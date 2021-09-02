import React from "react";
import Book from "./Book";

class Bookshelf extends React.Component {
  changeShelf = (book, shelf) => {
    this.props.changeShelf(book, shelf);
  }

  render() {
    const {books, shelf, title} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter((book) => {
              return book.shelf === shelf
            }).map((book) => (
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

export default Bookshelf;