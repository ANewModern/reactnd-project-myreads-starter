import React from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.onBookUpdate = this.onBookUpdate.bind(this);
  }
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  componentDidMount() {
    console.log(BooksAPI.getAll());
    BooksAPI.getAll().then(books => {
      this.setState(() => {
        return {
          currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
          wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
          read: books.filter((book) => book.shelf === 'read')
        };
      });
    });
  }
  onBookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState(() => {
          return {
            currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
            wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
            read: books.filter((book) => book.shelf === 'read')
          };
        });
      });
    });
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (<Search onBookUpdate={this.onBookUpdate} />)} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={this.state.currentlyReading} title='Currently Reading' onBookUpdate={this.onBookUpdate} />
                <Bookshelf books={this.state.wantToRead} title='Want To Read' onBookUpdate={this.onBookUpdate} />
                <Bookshelf books={this.state.read} title='Read' onBookUpdate={this.onBookUpdate} />
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
