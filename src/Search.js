import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
  // Search State
  state = {
    value: '',
    showSpinner: false,
    searchResults: []
  };

  searchBooks = () => {
    // Add a spinner
    this.setState({showSpinner:true})
    BooksAPI.search(this.state.value)
      .then(searchResults => {
        // This is to keep the same state across all the pages
        const results = searchResults.map(result => {
          const index = this.props.books.find(book => {
            return book.id === result.id;
          });
          if (index !== undefined) {
            return index;
          } else {
            return { ...result, shelf: 'none' };
          }
        });
        return results;
      })
      .then(searchResults => {
        this.setState({
          searchResults,
        });
      })
      .catch(() => {
        this.setState({
          searchResults: [],
        });
      }).finally(
        // Close the spinner
        this.setState({showSpinner:false})
      );
  };

  handleChange = event => {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        if (this.state.value !== '') {
          this.searchBooks();
        } else {
          this.setState({
            searchResults: [],
          });
        }
      },
    );
  };

  render() {
    const booksList =
      this.state.searchResults.length === 0
        ? <li key="no-results">No results</li>
        : this.state.searchResults.map(book => {
          return (
            <li key={book.id}>
              <Book book={book} onShelfUpdate={this.props.onShelfUpdate} />
            </li>
          );
        });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.value}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">    
          <ol className="books-grid">
            {booksList}
          </ol>
        </div>
        {
            this.state.showSpinner 
            ? <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            : null
          }  
      </div>
    );
  }
}

export default Search;