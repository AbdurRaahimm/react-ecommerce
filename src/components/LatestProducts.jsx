import React from 'react'
import ProductCard from './ProductCard'

export default function LatestProducts() {
    return (
        <div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-4/12 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-[#f6f6f6] left-1/2 dark:bg-gray-900 text-2xl font-bold">
                    Latest Products
                </div>
            </div>

            {/* Products */}

            <div className="grid grid-cols-1 gap-5 place-items-center  px-5 py-5 md:grid-cols-2 lg:grid-cols-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>



        </div>
    )
}
