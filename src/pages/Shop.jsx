import React, { useState } from 'react'
import { useProductContext } from '../context/products';
import ProductCard from '../components/ProductCard';
import FilterProducts from '../components/FilterProducts';
import Pagination from '../components/Pagination';


export default function Shop() {
  const { isLoading, error, products } = useProductContext();
  const pages = Math.ceil(products.length / 6);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [state, setState] = useState({
    search: '',
    category: 'All Products',
    brand: 'All Brands',
    color: 'All',
    price: 0,
    stars: 0,
    sortCriteria: '',
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-3 py-2">
      {/* <button className='block md:hidden border'>open</button> */}
      <div className="p-3 translate-x-90 md:block mt-5">
        {/* 1 */}
        <FilterProducts state={state} products={products} setState={setState} />

      </div>
      <div className="col-span-3">
        {/* 2 */}
        <div className="flex justify-between flex-col md:flex-row  bg-white py-1 px-2">
          <div className="space-x-3 flex">
            <button className='bg-black text-white px-1 rounded-sm'><i className='bi bi-grid'></i></button>
            <button className='bg-gray-300 text-black px-1 rounded-sm font-bold'><i className='bi bi-list-ul'></i></button>
          </div>
          <div className='flex justify-between'>
            <span className="text-muted-foreground mr-2"> {products.length} total products</span>
            <select
              onChange={(e) => setState({ ...state, sortCriteria: e.target.value })}
              name="sort" className="w-6/12  focus:outline-none">
              <option value="default">Sort by Default</option>
              <option value="rating">Sort by Rating</option>
              <option value="new">Sort by Newness</option>
              <option value="low">Sort by Price: low to high</option>
              <option value="high">Sort by Price: high to low</option>
            </select>

          </div>
        </div>
        <div >
          {
            products.length === 0 && <h1>No products found</h1>
          }
          {
            isLoading ? <h1>Loading...</h1> :
              error ? <h1>{error}</h1> :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3 space-y-3">
                  {
                    products
                      .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                      .filter((product) => product.name.toLowerCase().includes(state.search.toLowerCase()))
                      .filter((product) => state.category === 'All Products' ? true : product.category === state.category)
                      .filter((product) => state.brand === 'All Brands' ? true : product.company === state.brand)
                      .filter((product) => state.color === 'All' ? true : product.colors.includes(state.color))
                      .filter((product) => state.price === 0 ? true : product.price <= state.price)
                      .sort((a, b) => {
                        if (state.sortCriteria === 'rating') {
                          return b.rating - a.rating;
                        }
                        if (state.sortCriteria === 'new') {
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        }
                        if (state.sortCriteria === 'low') {
                          return a.price - b.price;
                        }
                        if (state.sortCriteria === 'high') {
                          return b.price - a.price;
                        }
                        return a.id - b.id;
                      })
                      .map((product) => {
                        return <ProductCard key={product.id} product={product} />
                      })
                  }
                </div>

          }

          {/* pagination */}
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
          />


        </div>
      </div>
    </div>
  )
}
