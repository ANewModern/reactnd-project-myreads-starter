import React from 'react';

class Book extends React.Component {
  state = {
    optionsState: ''
  }
  onBookUpdate = (e, book) => {
    const target = e.target.value;
    this.props.onBookUpdate(book, target);
  }
  componentDidMount() {
    this.setState({ optionsState: this.props.book.shelf ? this.props.book.shelf : 'none' });
  }
  render() {
    const bookImage = !!this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'https://dummyimage.com/128x193/2e7c31/fff.png&text=Cover+Missing';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + bookImage + ')' }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => this.onBookUpdate(e, this.props.book)} value={this.state.optionsState}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors.length > 1 ? this.props.book.authors.join(', ') : this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book;