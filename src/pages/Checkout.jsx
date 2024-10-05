import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice } from '../libs/formatPrice';
import { toast } from 'react-toastify';

export default function Checkout() {
    const locate = useLocation();
    const navigate = useNavigate();
    // const {cart,subtotal, shipping, totals } = locate.state;
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 100; // Fixed shipping cost
    const totals = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { first_name, last_name, email, address, city, zip, country } = formData;
        return first_name && last_name && email && address && city && zip && country;
    };

    const orderDetails = {
        user: formData,
        paymentMethod,
        orderId: Math.floor(Math.random() * 1000000),
        orderDate: new Date().toLocaleString(),
        orderTotal: formatPrice(totals, 120),

        // setCart pass the cart data to the orderDetails
    }

    const orderPlace = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill out all shipping address fields.');
            return;
        }

        if (!paymentMethod) {
            toast.error('Please select a payment method.');
            return;
        }

        setIsSubmitting(true);

        // Simulate order placing process (You might call an API here)
        setTimeout(() => {
            toast.success('Order placed successfully!');
            setIsSubmitting(false);
            navigate('/order-summary', {state: {orderDetails}});
        }, 2000); // Simulating delay for order processing
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 space-y-3 sm:space-y-0 sm:gap-4 py-5 px-4">
            {/* Shipping Address */}
            <div className="col-span-2 bg-white px-3 pb-4 rounded">
                <details className="open:bg-white dark:open:bg-slate-900 dark:open:ring-white/10 px-5 py-3 rounded-lg">
                    <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                        Shipping Address
                    </summary>
                    <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                                <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="city" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="zip" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Zip</label>
                                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Country</label>
                                <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 rounded-md border" />
                            </div>
                        </div>
                    </div>
                </details>

                {/* Payment Method */}
                <details className="open:bg-white dark:open:bg-slate-900 dark:open:ring-white/10 px-5 rounded-lg" open>
                    <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                        Payment Method
                    </summary>
                    <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 space-x-3">
                        <div className="flex justify-between">
                            <div >
                                <input
                                    id="cash"
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                />
                                <label htmlFor="cash" className="ml-2 text-xl font-semibold capitalize">Cash on delivery</label>
                            </div>
                            <div>
                                <input
                                    id="paypal"
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                />
                                <label htmlFor="paypal" className="ml-2 text-xl font-semibold capitalize">Paypal</label>
                            </div>
                            <div>
                                <input
                                    id="card"
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                                <label htmlFor="card" className="ml-2 text-xl font-semibold capitalize">Credit Card</label>
                            </div>

                        </div>
                        {paymentMethod === 'paypal' && (
                            <div className="mt-3">
                                <p>You will be redirected to PayPal to complete the payment.</p>
                                <button type="submit">
                                    <img width={200} src="https://abdurraahimm.github.io/food-delivery/assets/img/paypal-button.png" alt="Pay with PayPal" />
                                </button>
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <div className="mt-3">
                                <p>Please fill in your credit card details below:</p>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="card_number" className="block text-sm font-semibold">Card Number</label>
                                        <input type="text" id="card_number" name="card_number" className="mt-1 block w-full px-3 py-2 rounded-md border" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="card_name" className="block text-sm font-semibold">Card Name</label>
                                        <input type="text" id="card_name" name="card_name" className="mt-1 block w-full px-3 py-2 rounded-md border" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="expiry_date" className="block text-sm font-semibold">Expiry Date</label>
                                        <input type="date" id="expiry_date" name="expiry_date" className="mt-1 block w-full px-3 py-2 rounded-md border" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="cvv" className="block text-sm font-semibold">CVV</label>
                                        <input type="text" id="cvv" name="cvv" className="mt-1 block w-full px-3 py-2 rounded-md border" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </details>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-md px-5 py-6 overflow-hidden">
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
                    <hr className="my-3" />

                    <button
                        onClick={orderPlace}
                        className={`w-full rounded bg-[#092B56] text-white py-2 capitalize ${isSubmitting ? 'opacity-50' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                </ul>
            </div>
        </div>
    );
}
