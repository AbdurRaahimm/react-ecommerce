import React from 'react'

export default function AdBannar() {
  return (
    <div className='flex justify-between items-center gap-5 px-5 py-16 md:flex-row flex-col'>
        <div className="flex-1 bg-[url('https://bonik-react.vercel.app/assets/images/banners/banner-21.jpg')] bg-cover p-8">
            <h5 className='text-xl font-semibold'>Final Reduction</h5>
            <h3 className='text-3xl font-bold'>Sale up to 20% Off</h3>
            <hr className='w-16 h-1 my-3 bg-black' />
            <p className='text-xl text-gray-600'>Get all exclusive offers for the season</p>
        </div>
        <div className="flex-1 bg-[url('/banner-22.jpg')] bg-cover p-8">
            <h5 className='text-xl font-semibold text-white'>Weekend Sale</h5>
            <h3 className='text-3xl font-bold text-white'>Sale up to 20% Off</h3>
            <hr className='w-16 h-1 my-3 bg-white ' />
            <p className='text-xl text-white'>Get all exclusive offers for the season</p>
        </div>
    </div>
  )
}
