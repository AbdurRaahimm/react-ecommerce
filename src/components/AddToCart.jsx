import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart';

export const AddToCart = ({ product, quantity }) => {
    const [clicked, setClicked] = useState(false);
    const { cart, total, addToCart } = useCartContext();
    console.log(quantity)

    // handleAddToCart function call once  true 
    const handleAddToCart = async () => {
        //    if(!clicked){
        //        addToCart(product);
        //        setClicked(true);
        //     //    alert("Product Added Successfully")
        //    }

        await addToCart(quantity,product);
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <button
            onClick={handleAddToCart}
            className="w-full rounded-lg bg-[#092B56] px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600 ">
            Add to Cart
        </button>
    )
}
