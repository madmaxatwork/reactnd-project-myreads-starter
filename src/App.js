import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import List from './List'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
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

  // This will update the current book state 
  updateBookState(book, shelf, currentBooksState) {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState({
          books: currentBooksState
        })
      })
  }


  shelfUpdate = (book, shelf) => {
    const currentBooksState = [...this.state.books]
    const bookIndex = this.state.books.indexOf(book)

    if (shelf === 'none') {
      console.log('shelf = none')
      currentBooksState.splice(bookIndex, 1)
    } else if (book.shelf === 'none') {
      console.log('book.shelf = none')
      const updatedBook = { ...book, shelf }
      currentBooksState.push(updatedBook)
    } else {
      console.log('in else')
      const updatedBook = { ...book, shelf }
      currentBooksState[bookIndex] = updatedBook
    }

    this.updateBookState(book, shelf, currentBooksState)
  }


  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route exact path='/' render={() => (
            <List books={this.state.books} onShelfUpdate={this.shelfUpdate} />
          )} />
          <Route path='/search' render={() => (
            <Search books={this.state.books} onShelfUpdate={this.shelfUpdate} />
            )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp