import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  // Book state
  state = {
    value: this.props.book.shelf ? this.props.book.shelf : 'none'
  }

  handleChange = (event) => {
    this.props.onShelfUpdate(this.props.book, event.target.value)
    this.setState({ value: event.target.value }) 
  }

  render() {
    // Get the authors. Authors can be null 
    const authors = this.props.book.authors || [] 
    // Get the Thumbnail
    let thumbnail = ''
    if(this.props.book.imageLinks ) {
      if(this.props.book.imageLinks.thumbnail) {
        thumbnail = this.props.book.imageLinks.thumbnail
      } 
      else if(this.props.book.imageLinks.smallThumbnail) {
        thumbnail = this.props.book.imageLinks.smallThumbnail
      }
    }
    const authorsList = authors.map((author) => {
      return <div key={author}>{author}</div>
    })

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumbnail + ')' }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{authorsList}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book;