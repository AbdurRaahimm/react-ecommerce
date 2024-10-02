import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart";
import emptyCart from '/cart.png';

export default function Cart() {
  const { removeFromCart } = useCartContext();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleRemoveCart = (product) => { 
    removeFromCart(product);
    // remove from local storage
    const updatedCart = cart.filter(item=>item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  return (
    <div>
      {
        cart.length === 0 &&
        <div className="w-4/12 mx-auto flex flex-col  items-center py-10">
          <img src={emptyCart} width={200} alt="empty cart" />
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-center text-gray-500">
            Looks like you haven't added any products to your cart yet. Go ahead and add some products to your cart.
          </p>
          <Link className="
          bg-blue-500 text-white px-3 py-1 rounded-md mt-3 
          " to='/products'>Continue Shopping</Link>
        </div>
      }

      <div className="">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            cart.map((product) => {
              return (
                <div key={product.id} className="flex items-center justify-between border-b p-2">
                  <div className="flex items-center space-x-2">
                    <img src={product.image} width={100} alt={product.name} />
                    <div>
                      <h6 className="text-lg font-semibold">{product.name}</h6>
                      <p className="text-gray-500">Price: ${product.price}</p>
                    </div>
                  </div>
                  <div>
                    <button onClick={()=> handleRemoveCart(product) }  className="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                  </div>
                </div>
              )
            })
          }
         
           {/* order summary  */}
            {
              cart.length > 0 && <div className="p-4 border">
                <h1 className="text-xl font-semibold">Order Summary</h1>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${cart.reduce((acc, item) => acc + item.price, 0)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>${cart.reduce((acc, item) => acc + item.price, 0)}</p>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md mt-3">Proceed to Checkout</button>
              </div>
            }
        </div>
      </div>

    </div>
  )
}
