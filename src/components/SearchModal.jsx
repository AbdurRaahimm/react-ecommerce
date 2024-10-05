import React, { useState, useRef, useEffect } from 'react';
import { useProductContext } from '../context/products';
import SearchResult from './SearchResult';

export default function SearchModal() {
  const [isDragging, setIsDragging] = useState(false); // Track if modal is being dragged
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track modal position
  const [query, setQuery] = useState(''); // State for search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  const { products } = useProductContext(); // Getting products from context
  const dialogRef = useRef(null); // Reference to the modal element

  // Handle search input change
  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    // Filter products based on the search query
    if (searchValue.trim() !== '') {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  // Handle drag start event
  const handleDragStart = (e) => {
    setIsDragging(true);
    const { offsetLeft, offsetTop } = dialogRef.current; // Get current modal position
    const { clientX, clientY } = e;

    setPosition({ x: clientX - offsetLeft, y: clientY - offsetTop });
  };

  // Handle dragging the modal
  const handleDrag = (e) => {
    if (!isDragging) return;

    const { clientX, clientY } = e;
    const newX = clientX - position.x;
    const newY = clientY - position.y;

    // Update modal position
    dialogRef.current.style.left = `${newX}px`;
    dialogRef.current.style.top = `${newY}px`;
  };

  // Handle drag end event
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // when user click in keyboard `Ctrl + K` then open the dialog and focus the input field and close the dialog when user press `Esc` key 
  useEffect(() => {
    const handleKeyDown = (e) => {
     
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        dialogRef.current.showModal();
        document.querySelector('input[type="search"]').focus();
      }

      if (e.key === 'Escape') {
        dialogRef.current.close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }
    , []);

  return (
    <dialog
      ref={dialogRef}
      className="w-full  md:w-8/12 rounded-md p-5  cursor-move bg-white shadow-lg z-50"
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} // Prevents the dragging if the cursor leaves the modal
    >
      <button
        onClick={() => dialogRef.current.close()} // Close the modal
        className="flex items-center cursor-pointer absolute right-3 top-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="border border-sky-500 rounded-full size-5 fill-sky-500 stroke-sky-500" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
    
      <form className='pt-8'>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input
            className=" placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search Products..."
            type="search"
            value={query}
            onChange={handleInputChange} // Search input change handler
          />
        </label>
        {/* Esc text in last */}
        <p className="text-xs text-gray-500 mt-1">Press `Esc` to close</p>

      </form>

      {/* Suggestion List */}
      {filteredProducts.length === 0 && query.trim() !== '' && (
        <p className="mt-4 text-gray-500">No products found</p>
      )}

      {filteredProducts.length > 0 && (
        <div className="mt-4 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
          {filteredProducts.map((product) => (
            <SearchResult key={product.id} product={product} />
          ))}
        </div>
      )}
    </dialog>
  );
}
