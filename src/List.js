import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

const List = (props) => {

  // Different List Types available
  const FILTERCATEGORIES = [
    { filterType: 'CurrentlyReading', filterText: 'Currently Reading' },
    { filterType: 'WantToRead', filterText: 'Want to Read' },
    { filterType: 'Read', filterText: 'Read' }
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
        key={category.filterType}
        title={category.filterText}
        books={filter(props.books, category.filterType)}
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