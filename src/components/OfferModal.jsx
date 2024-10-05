import React from 'react'
import { toast } from 'react-toastify';

export default function OfferModal() {
    const handleNewsLetter = (e) => {
        e.preventDefault();
        toast.success('Subscribed to newsletter');
        document.querySelector('#popup').close();
    }
    return (
        <dialog id="popup" className="top-[40%] z-50 w-full md:w-7/12 py-8 " open>
            <button
                onClick={() => document.querySelector('#popup').close()}
                className="flex items-center cursor-pointer absolute right-3 top-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="border border-sky-500 rounded-full size-5 fill-sky-500 stroke-sky-500" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>

            <div className="flex flex-col items-center justify-center space-y-4 p-4">
                <h1 className="text-2xl font-bold text-sky-600">Get 10% Off</h1>
                <p className="text-center text-gray-500">Subscribe to our newsletter and get 10% off your first purchase</p>
                <form onSubmit={handleNewsLetter} className="flex flex-col items-center space-y-4">
                    <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-md p-2 w-80 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" />
                    <button type="submit" className="bg-sky-500 text-white rounded-md p-2 w-80 focus:outline-none">Subscribe</button>
                </form>
            </div>
        </dialog>

    )
}
