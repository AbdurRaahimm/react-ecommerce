import React from 'react'
import Navber from './Navber'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Topbar from './Topbar'


export default function Layout() {
    return (
        <>
            <header className='print:hidden'>
                <Topbar />
                <Navber />
            </header>

            <main>
                <Outlet />
            </main>

            <div className="print:hidden">
                <Footer />
            </div>
        </>
    )
}
