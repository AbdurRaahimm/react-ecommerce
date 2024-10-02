import React, { useEffect } from 'react'
import { useCartContext } from '../context/cart';

export const AddToCart = ({ product }) => {
    const { cart, total, addToCart } = useCartContext();

    const handleAddToCart = () => {
        addToCart(product);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <button
            onClick={handleAddToCart}
            className="rounded-lg bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600">
            Add to Cart
        </button>
    )
}
