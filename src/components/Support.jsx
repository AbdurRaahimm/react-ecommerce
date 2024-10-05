import React from 'react'

export default function Support() {
    return (
        <div className='py-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 px-3'>
            <div className="flex space-x-3 bg-white px-3 py-8 rounded-md">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-1.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Free Shipping</h3>
                    <p className="text-gray-500 text-sm">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3 bg-white px-3 py-8 rounded-md">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-2.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Support 24/7</h3>
                    <p className="text-gray-500 text-sm">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3 bg-white px-3 py-8 rounded-md">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-3.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Money Return </h3>
                    <p className="text-gray-500 text-sm">We are here to support you 24/7</p>
                </div>
            </div>
            <div className="flex space-x-3 bg-white px-3 py-8 rounded-md">
                <img className='size-12 hover:animate-pulse' src="https://flone.jamstacktemplates.dev/assets/img/icon-img/support-4.png" alt="" />
                <div className="">
                    <h3 className="text-xl font-bold">Order Discount</h3>
                    <p className="text-gray-500 text-sm">We are here to support you 24/7</p>
                </div>
            </div>
        </div>
    )
}
