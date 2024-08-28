import React from 'react'
import Layout from '../components/Layout'
import { useLocation, useParams } from 'react-router-dom'

export default function Post() {
   const locate = useLocation();
    console.log(locate.state);
  return (
    <Layout>
        <h1>Post  </h1>
        <h2 className='text-3xl'>{locate.state.title}</h2>
        <p>{locate.state.body}</p>

    </Layout>
  )
}
