import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Form, redirect } from "react-router-dom"

export async function action({ request }) {
    const searchData = await request.formData()
    console.log(searchData)
    const searchTerm = searchData.get("search-term")
    return redirect(`/books?q=${searchTerm}`)
}

const NavBar = () => {
  return (
    <Navbar expand="lg" className="header">
        <Navbar.Brand href="/" className="site-logo">
            <img
                src="/assets/logo.png"
                alt="logo"
            />
        </Navbar.Brand>
        <Form method="post" className="d-flex search">
            <input
                name="search-term"
                type="search-term"
                placeholder="Search for a book"
            />
            <button>Search</button>
        </Form>
    </Navbar>
  );
};

export default NavBar;
