import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Form, NavLink, redirect } from "react-router-dom"
import { ShopContext } from '../context/ShopContext'
import SearchIcon from '@mui/icons-material/Search'

export async function action({ request }) {
    const searchData = await request.formData()
    const searchTerm = searchData.get("search-term")
    return redirect(`/books?q=${searchTerm}`)
}

const NavBar = () => {
    const { nbItems } = useContext(ShopContext)

    return (
        <Navbar expand="lg" className="header">
            <Navbar.Brand href="/" className="site-logo">
                <img src="/assets/logo.png" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">        
                <Nav className="ml-auto">
                    <Form method="post" className="d-flex search">
                        <input
                            name="search-term"
                            type="search-term"
                            placeholder="Search for a book"
                        />
                        <button><SearchIcon /></button>
                    </Form>
                
                    <NavLink to="/cart" className="nav-link header-cart">
                        <img src="/assets/cart.png" alt="cart" className="cart-logo" />
                        <span>{nbItems}</span>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
