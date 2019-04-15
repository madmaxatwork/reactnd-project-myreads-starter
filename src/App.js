import React from 'react';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import List from './List'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: []
  }

  componentDidMount() {
    this.retrieveAllBooks();
  }


  // This will get all the required books. Can be extended 
  retrieveAllBooks() {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
      .catch(() => { alert('Something messed up :().'); });
  }

  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route exact path='/' render={() => (
            <List books={this.state.books} />
          )} />
          <Route path='/search' render={() => (
            <Search />
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp