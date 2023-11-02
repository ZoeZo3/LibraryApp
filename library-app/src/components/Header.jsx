import React from "react"
import { Link, Form, redirect } from "react-router-dom"

export async function action({ request }) {
    const searchData = await request.formData()
    const searchTerm = searchData.get("search-term")
    return redirect(`/books?q=${searchTerm}`)
}

export default function Header() {
    
    return (
        <header>
            <Link className="site-logo" to="/" >
            <img
                src="/assets/logo.png"
                alt="logo"
                />
            </Link>
            <Form 
                method="post" 
                className="search" 
            >
                <input
                    name="search-term"
                    type="search-term"
                    placeholder="Search for a book"
                />
                <button>Search</button>
            </Form>
        </header>
    )
}