import React from 'react'
import Navber from './Navber'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Topbar from './Topbar'


export default function Layout() {
    return (
        <>
            <header>
                <Topbar />
                <Navber />
            </header>

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}
