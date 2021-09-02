import React from "react";
import * as PropTypes from "prop-types";
import ListBooksContent from "./ListBooksContent";
import {Link} from "react-router-dom";

class ListBooks extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBooksContent/>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {onClick: PropTypes.func};

export default ListBooks;