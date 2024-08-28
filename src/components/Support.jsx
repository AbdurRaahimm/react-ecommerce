import React from 'react'

export default function Support() {
    return (
        <div className='px-4 py-7 grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-4 '>
            <div className="flex space-x-3">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-1.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Free Shipping</h3>
                    <p className="text-gray-500">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-2.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Support 24/7</h3>
                    <p className="text-gray-500">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-3.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Money Return </h3>
                    <p className="text-gray-500">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-4.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Order Discount</h3>
                    <p className="text-gray-500">We are here to support you 24/7</p>
                </div>
            </div>
        </div>
    )
}
