import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({ numPages, setCurrentPage, currentPage, pageNumber }) => {
  console.log('pageNumber', pageNumber)
  const pageNumbers = [...Array(numPages + 1).keys()].slice(1);
  console.log('page number', pageNumbers)
  return (
    <nav id="page-list">
      <ul id="pages">
        {pageNumbers.map((pgNumber) => {
          return (
            <li key={pgNumber} className={pageNumber === pgNumber ? 'pageSelected' : ''}>
              <Link
                onClick={() => setCurrentPage(pgNumber)}
              >
                {pgNumber}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Pagination