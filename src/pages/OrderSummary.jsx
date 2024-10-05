import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function OrderSummary() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const navigate = useNavigate();
    const locate = useLocation();
    console.log(locate.state)
    const orderData = locate.state?.orderDetails;
    const userInfo = orderData?.user
    const payment = orderData?.paymentMethod;

    const handleOrderConfirm = () => {
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/order')
        toast.success('Order confirmed successfully');
    }

    return (
        <section>
            <div className="sm:w-6/12 mx-auto flex flex-col items-center py-10">
                <h1 className="text-2xl font-semibold">
                    Your order Summary
                </h1>
                <p className="text-center text-gray-500 capitalize">
                    see your order details below and confirm your shipping address and payment method.
                </p>
                <div className="bg-white w-full sm:w-10/12 px-4 py-4 mt-5 rounded">
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">Order Details</h2>
                        <div className="flex justify-between w-full mt-3">
                            <p>Order ID</p>
                            <p>#{orderData?.orderId}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Order Date</p>
                            <p>{orderData?.orderDate}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Order Total</p>
                            <p>{orderData?.orderTotal}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                        <div className="flex justify-between w-full mt-3">
                            <p>Name</p>
                            <p>{userInfo?.first_name} {userInfo.last_name}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Email</p>
                            <p>{userInfo?.email}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Address</p>
                            <p>{userInfo?.address}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>City</p>
                            <p>{userInfo?.city}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Postal Code</p>
                            <p>{userInfo?.zip}</p>
                        </div>
                        <div className="flex justify-between w-full mt-3">
                            <p>Country</p>
                            <p>{userInfo?.country}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">Payment Method</h2>
                        <div className="flex justify-between w-full mt-3">
                            <p>Method</p>
                            <p>{payment}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-5">
                    <button onClick={handleOrderConfirm} className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3 print:hidden">Confirm Order</button>
                    <button className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3 print:hidden" onClick={() => window.print()}>Print Order</button>
                    <Link className="bg-[#092B56] text-white px-3 py-2 rounded-md mt-3 print:hidden" to='/products'>Continue Shopping</Link>
                </div>
            </div>
        </section>
    )
}
