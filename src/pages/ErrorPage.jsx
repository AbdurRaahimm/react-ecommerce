import React from 'react'
import Layout from '../components/Layout'
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className='text-xl font-bold'>Oops!</h1>
                <p>
                    <i> {error.status}  {error.statusText}</i>
                </p>
                <p>Sorry, an unexpected error has occurred.</p>
                <Link to="/" className="text-blue-500">Go back to the home page</Link>
            </div>
        </>
    )
}
