import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Support from '../components/Support'
import AdBannar from '../components/AdBannar'
import LatestProducts from '../components/LatestProducts'
import Posts from './Posts'
import Brand from '../components/Brand'


export default function Home() {

    return (
        <>
            <Hero />
            <Support />
            <LatestProducts  />
            <AdBannar />
            {/* <Posts /> */}
            <Brand />
        </>
    )
}
