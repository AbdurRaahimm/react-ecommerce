import React from 'react'

export default function OfferModal() {
    return (
        <dialog id="popup" className="w-6/12 p-2 rounded-md absolute left-10 top-[50%] z-50" open>

            <button onClick={() => document.querySelector('#popup').close()} className="text-2xl float-right "> &times; </button>


            Product offer 30%
        </dialog>

    )
}
