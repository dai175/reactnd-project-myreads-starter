import React from "react";

class Book extends React.Component {
  handleChange = (e) => {
    const book = this.props.book;
    const shelf = e.target.value;
    this.props.changeShelf(book, shelf)
  }

  render() {
    const {book} = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''
          }}>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={book.shelf ? book.shelf : "none"}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;