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
            this.setState({ books });
        });
    }
    onTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText) {
            console.log(inputText);
            this.setState({ inputText });
            this.search(inputText);
        } else {
            this.setState({ inputText });
        }
    }
    
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.inputText} onChange={(e) => this.onTextChange(e)}/>

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