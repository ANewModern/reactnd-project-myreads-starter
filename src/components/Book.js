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
    return (
      <div className="book">
        <div className="book-top">
          {!!this.props.book.imageLinks.thumbnail && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.book.imageLinks.thumbnail + ')' }}></div>}
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
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book;