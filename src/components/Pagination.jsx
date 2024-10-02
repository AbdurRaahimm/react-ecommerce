import React from 'react'

export default function Pagination({ pages, pageNumbers, currentPage, setCurrentPage }) {

    return (
        <div className='flex justify-center space-x-2'>
        <button onClick={
          () => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }
        } 
        
        className={`bg-gray-200 px-2 py-1 rounded-sm ${ currentPage === 1 ? 'hidden' : 'block'}`}>Prev</button>
        {/* active bg */}
        {
          pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 py-1 rounded-sm ${currentPage === number ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
            >
              {number}
            </button>
          ))
        }
        <button onClick={
          () => {
            if (currentPage < pages) {
              setCurrentPage(currentPage + 1);
            }
          }
        } 
        
        className={`bg-gray-200 px-2 py-1 rounded-sm ${ currentPage === pages ? 'hidden' : 'block'  }`}>Next</button>
      </div>
    )
}
