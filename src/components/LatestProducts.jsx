import React from 'react'
import ProductCard from './ProductCard'
import { useProductContext } from '../context/products'
import { Link } from 'react-router-dom';

export default function LatestProducts({ limit }) {
    const { isLoading, error, products: allProducts } = useProductContext();
    // console.log(allProducts);
    return (
        <div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-4/12 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-[#f6f6f6] left-1/2 dark:bg-gray-900 text-xl sm:text-2xl font-bold">
                    Latest Products
                </div>
            </div>

            {/* Products */}

            <div className="grid grid-cols-1 gap-3 place-items-center md:grid-cols-2 lg:grid-cols-4 px-4">
                {
                    isLoading ? <h1>Loading...</h1> :
                        error ? <h1>{error}</h1> :
                            allProducts.slice(0, limit).map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })
                }
            </div>

            {/* see more */}
            <div className="flex justify-center mt-4">
                <Link to="/products" className="px-4 py-2 text-white bg-gray-800 rounded-md">See More</Link>
            </div>



        </div>
    )
}
