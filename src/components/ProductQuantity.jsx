import React, { useState } from 'react'

export default function ProductQuantity({ stock }) {
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        setQuantity(quantity - 1);
    };
    return (
        <>
            {
                stock > 0 ? (
                    <div className="flex items-center space-x-4 mt-2 ">
                        <button onClick={handleDecrement} disabled={quantity === 1} style={{ cursor: quantity === 1 ? 'not-allowed' : 'pointer' }} className="font-bold px-3 py-1 bg-gray-200 rounded-lg ">-</button>
                        <span className='font-extrabold'>{quantity}</span>
                        <button onClick={handleIncrement} disabled={quantity === stock} style={{ cursor: quantity === stock ? 'not-allowed' : 'pointer' }} className="font-bold px-3 py-1 bg-gray-200 rounded-lg">+</button>
                    </div>
                ) : (
                    <div className="mt-4">
                        <span className="font-semibold">Out of Stock</span>
                    </div>
                )
            }

        </>
    )
}
