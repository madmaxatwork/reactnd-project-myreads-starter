import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

const List = (props) => {

  // Different List Types available
  const FILTERCATEGORIES = [
    { filter: 'currentlyReading', text: 'Currently Reading' },
    { filter: 'wantToRead', text: 'Want to Read' },
    { filter: 'read', text: 'Read' }
  ]

  // Returns the filtered Books
  const filter = (books, filterType) => {
    return books.filter((book) => {
      return book.shelf === filterType
    })
  }

  // Creates a Shelf based on the Category
  const list = FILTERCATEGORIES.map((category) => {
    return (
      <Shelf
        key={category.filter}
        title={category.text}
        books={filter(props.books, category.filter)}
        onShelfUpdate={props.onShelfUpdate} />
    )
  })

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {list}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default List