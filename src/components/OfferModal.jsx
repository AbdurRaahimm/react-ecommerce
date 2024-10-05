import React from 'react'

export default function OfferModal() {
    return (
        <dialog id="popup" className="    top-[0%] z-50" open>

            <button onClick={() => document.querySelector('#popup').close()} className="text-2xl "> &times; </button>


            Product offer 30%
        </dialog>

    )
}
