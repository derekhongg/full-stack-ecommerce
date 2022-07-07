import Head from 'next/head'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'

export default function Account() {

    const { user, logoutUser } = useContext(AuthContext)

    if(!user) {
        return (
            <div>
                <p>Please Login or Register</p>
                <Link href="/">
                    <a>Go Back</a>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Account Page</title>
                <meta name="description" content="the account page, view your order and logout"/>
            </Head>

            <h2>Account Page</h2>
            <p>Logged in as: {user.email}</p>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    )
}