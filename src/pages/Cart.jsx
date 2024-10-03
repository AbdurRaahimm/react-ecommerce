import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart";
import emptyCart from '/cart.png';
import { formatPrice } from "../libs/formatPrice";
import { useProductContext } from "../context/products";

export default function Cart() {
  const { products } = useProductContext();
  const { removeFromCart } = useCartContext();
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  // Sync local storage whenever cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveCart = (product) => {
    removeFromCart(product);
    setCart(prevCart => prevCart.filter(item => item.id !== product.id));
  };

  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleAllClear = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 100; // Fixed shipping cost
  const totals = subtotal + shipping;

  return (
    <div>
      {cart.length === 0 ? (
        <div className="sm:w-6/12 mx-auto flex flex-col items-center py-10">
          <img src={emptyCart} width={200} alt="empty cart" loading="lazy" />
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-center text-gray-500">
            Looks like you haven't added any products to your cart yet. Go ahead and add some products to your cart.
          </p>
          <Link className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3" to='/products'>Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 space-y-3 sm:space-y-0 sm:gap-4 py-5 px-4">
          <div className="col-span-2 bg-white px-3 pb-4 rounded">
            <div className="mt-4 space-y-4 divide-y-2">
              {cart.map((product) => (
                <div key={product.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center space-x-4">
                    <img src={product.image[0].url} width={50} alt={product.name} />
                    <div>
                      <h4 className="text-lg font-semibold">{product.name}</h4>
                      <p className="text-gray-500 text-sm">{formatPrice(product.price, 120)}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{formatPrice(product.price * product.quantity, 120)}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      disabled={product.quantity === 1}
                      onClick={() => decreaseQuantity(product.id)} className={`bg-gray-200 rounded-md px-3 py-1 ${product.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>-</button>
                    <span>{product.quantity}</span>
                    <button
                      disabled={product.quantity === products.find(item => console.log(item.id === product.id))?.stock}
                      onClick={() => increaseQuantity(product.id)} className={`bg-gray-200 rounded-md px-3 py-1 ${product.quantity === products.find(item => item.id === product.id).stock ? 'cursor-not-allowed' : 'cursor-pointer'} `}>+</button>
                    <button onClick={() => handleRemoveCart(product)} className="bg-red-500 text-white font-bold px-3 py-1 rounded-md">&times;</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Link className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3" to='/products'>Continue Shopping</Link>
              <button onClick={handleAllClear} className="bg-red-500 text-white px-3 py-2 rounded-md mt-3">Clear All</button>
            </div>
          </div>
          <div className="bg-white rounded-md px-5 py-6">
            <h3 className="text-xl text-black/95 font-semibold capitalize">Order Summary</h3>
            <ul className="mt-4 space-y-4 divide-y-2">
              <li className="text-gray-500 text-sm font-semibold">
                Subtotal
                <span className="float-right">{formatPrice(subtotal, 120)}</span>
              </li>
              <li className="text-gray-500 text-sm font-semibold pt-3">
                Shipping
                <span className="float-right">{formatPrice(shipping, 120)}</span>
              </li>
              <li className="text-black/75 text-sm font-semibold pt-2">
                <h4 className="text-lg font-semibold">Total
                  <span className="float-right">{formatPrice(totals, 120)}</span>
                </h4>
              </li>
              <button className="w-full rounded bg-[#092B56] text-white py-2 capitalize">Checkout</button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
