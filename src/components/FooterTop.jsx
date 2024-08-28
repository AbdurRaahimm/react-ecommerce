import React from 'react'

export default function () {
    return (
        <div className='grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-2 lg:grid-cols-4'>
            <div className="space-y-5">
                <h3 className='text-2xl text-[#fe5510] font-extrabold'>ShopEasy</h3>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida.</p>
            </div>
            <div className="space-y-3">
                <h3 className='text-2xl font-bold'>About Us</h3>
                <ul className=''>
                    <li>Careers</li>
                    <li>Our Store</li>
                    <li>Our Blog</li>
                    <li>Terms and Conditions</li>
                </ul>

            </div>
            <div className="space-y-3">
                <h3 className='text-2xl font-bold'>Customer Care</h3>
                <ul className=''>
                    <li>help center</li>
                    <li>How to buy</li>
                    <li>Track your order</li>
                    <li>Shipping</li>
                    
                </ul>
            </div>
            <div className="space-y-3">
                <h3 className='text-2xl font-bold'>Contact Us</h3> 
                <ul className=''>
                    <li>
                        <span>Address:</span>
                        <span> 123, Main Street, Your City</span>
                    </li>
                    <li>
                        <span>Phone:</span>
                        <span> +123 456 789</span>
                    </li>
                    <li>
                        <span>Email:</span>
                        <span>
                            <a href="mailto:admin@mail.com "> admin@mail.com </a>
                        </span>
                    </li>
                </ul>

            </div>
        </div>
    )
}
