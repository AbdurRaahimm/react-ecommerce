import React from 'react'
import FooterTop from './FooterTop'

export default function Footer() {
    return (
        <footer className="">
            <FooterTop />
            <hr />
            <p className='text-center py-2'>&copy; 2023-{new Date().getFullYear()} ShopEasy. All rights reserved.</p>
        </footer>
    )
}
