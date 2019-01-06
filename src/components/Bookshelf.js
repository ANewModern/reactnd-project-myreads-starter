import React from 'react';
import Book from './Book';

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book) => {
                    return <li key={book.id}><Book onBookUpdate={props.onBookUpdate} book={book} key={book.id} /></li>
                })}
            </ol>
        </div>
    </div>
);

export default Bookshelf;