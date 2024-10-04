import { Link } from 'react-router-dom'
import emptyCart from '/cart.png';

export default function Order() {
    return (
        <div className="sm:w-6/12 mx-auto flex flex-col items-center py-10">
            <img src={emptyCart} width={200} alt="empty cart" loading="lazy" />
            <h1 className="text-2xl font-semibold">
                Your order is successfully placed
            </h1>
            <p className="text-center text-gray-500">
                Thank you for shopping with us. Your order is successfully placed. We will send you an email with the order details.
            </p>
            <Link className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3" to='/products'>Continue Shopping</Link>
        </div>
    )
}
