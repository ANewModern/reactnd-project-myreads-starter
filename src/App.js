import React from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  onBookUpdate = () => {

  }
  render() {
    let currentlyReading;
    let wantToRead;
    let read;
    if (this.state.books) {
      currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading');
      wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead');
      read = this.state.books.filter((book) => book.shelf === 'read');
    }
    return (
      <div className="app">
        <Route path="/search" render={() => (<Search />)} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={currentlyReading} title='Currently Reading' />
                <Bookshelf books={wantToRead} title='Want To Read' />
                <Bookshelf books={read} title='Read' />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
