import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../libs/formatPrice'

export default function SearchResult({ product }) {
 
    return (
        <Link to={`/product/${product.id}`} className="flex items-center p-2 space-y-2 border-b border-gray-300 hover:bg-gray-100">
            <div 
            className="flex items-center" >
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                <div className="ml-2">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs text-gray-500">{formatPrice(product.price, 120)}</p>
                </div>
            </div>
        </Link>
    )
}
