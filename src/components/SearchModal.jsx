import React from 'react'

export default function SearchModal() {
    return (
        <dialog className="w-6/12 p-2 rounded-md">

            <button onClick={() => document.querySelector('dialog').close()} className="text-2xl float-right border rounded-full size-8"> &times; </button>


            <form className="pb-4">
                <input list='search' type="text" placeholder="search" className="w-full p-2 border border-gray-300" />
            </form>

            <datalist id='search'>
                <option value="product1" >
                    <img src="" alt="" />
                    product1 q
                </option>
                <option value="product2" />
                <option value="product3" />
                <option value="product4" />
                <option value="product5" />
            </datalist>

        </dialog>

    )
}