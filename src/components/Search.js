import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends React.Component {
    state = {
        books: [],
        inputText: ''
    }
    search = (query) => {
        BooksAPI.search(query).then((books) => {
            console.log(books);
            if (books.error) {
                this.setState({ books: [] });
            } else {
                this.setState({ books });
            }
        });
    }
    onTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText) {
            console.log(inputText);
            this.setState({ inputText });
            this.search(inputText);
        } else {
            this.setState(() => {
                return {
                    books: [],
                    inputText
                };
            });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.inputText} onChange={(e) => this.onTextChange(e)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => {
                            return <li key={book.id}><Book onBookUpdate={this.props.onBookUpdate} book={book} /></li>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;