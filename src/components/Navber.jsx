import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menus } from '../data/menus';
import SearchModal from './SearchModal';
import { useCartContext } from '../context/cart';

export default function Navber() {
    const { totalItems } = useCartContext();  // Assume this context provides the total number of cart items
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [isMenuVisible, setMenuVisible] = useState(false);

    // Live update cart from localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(updatedCart);
        };

        // Listen for changes in localStorage to update the cart state
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    return (
        <div className='bg-white'>
            <div className='sticky top-0 flex md:flex-row justify-between items-center shadow-md py-2 px-3'>
                <Link to="/" className="text-2xl font-bold text-black capitalize italic flex justify-center items-center">
                    <img src="/logo.png" alt="logo" width={35} />
                    ShopEasy
                </Link>

                <nav className={`hidden md:block md:left-0`}>
                    <ul className="items-center justify-between gap-10 md:flex">
                        {menus.map(menu => (
                            <li key={menu.id} className="group flex cursor-pointer flex-col font-bold">
                                <NavLink
                                    to={menu.link}
                                    style={({ isActive }) => ({
                                        color: isActive ? '#0ea5e9' : 'black',
                                        fontWeight: isActive ? 'bold' : 'normal',
                                    })}
                                    className="capitalize font-bold">
                                    {menu.title}
                                </NavLink>
                                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center justify-around space-x-3">
                    {/* Search Button quick Search press Ctrlk*/}
                    <label 
                    onClick={() => document.querySelector('dialog').showModal()}
                    className="relative block cursor-pointer" 
                    aria-disabled disabled
                    >
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                            </svg>
                        </span>
                        <input
                            className="block w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none cursor-pointer sm:text-sm"
                            placeholder="Quick Search for Ctrl+K"
                            type="search"
                        />
                    </label>
                 

                    {/* Cart Link */}
                    <Link to="cart" className="relative w-fit cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="size-6 cursor-pointer">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-[10px] text-white">
                            {cart.length || totalItems}
                        </span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <svg
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list size-6 cursor-pointer md:hidden"
                        viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>

                <SearchModal />
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuVisible ? 'block' : 'hidden'} bg-white shadow-md px-3 py-2 `}>
                <ul className='space-y-4'>
                    {menus.map(menu => (
                        <li key={menu.id} className="group flex cursor-pointer flex-col font-bold  ">
                            <NavLink
                                to={menu.link}
                                style={({ isActive }) => ({
                                    color: isActive ? '#0ea5e9' : 'black',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                })}
                                className="capitalize font-bold hover:text-[#0ea5e9]  ">
                                {menu.title}
                            </NavLink>
                            {/* <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
