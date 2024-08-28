import React from 'react'
import Layout from '../components/Layout'
import { Link, useLoaderData, useNavigation } from 'react-router-dom';

export default function Posts() {
    const posts = useLoaderData();
    const navigation = useNavigation();
    console.log(navigation.state);
    // navigation.state === 'loading' ? <h1>Loading...</h1> : null
    if (navigation.state === 'loading') {
      return <>
        <h1>Loading...</h1>
      </>
    }
  return (
    <>
        <h1>Posts</h1>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                   <Link to={`${post.id}`} state={post} >{post.title}</Link> 

                </li>
            ))}
        </ul>
    </>
  )
}



export const Dataloader = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
  }