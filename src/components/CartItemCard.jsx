import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { getBook } from '../../api'
import { ShopContext } from '../context/ShopContext'

export default function CartItemCard(props) {

    const [book, setBook] = useState("")
    const { addToCart, removeFromCart } = useContext(ShopContext)

    useEffect( () => {
        
        async function fetchData() {
            try {
                const result = await getBook(props.id)  
                setBook(result)      
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        }
        fetchData();
    }, [props.id])


    return (
        <section>
            {book && (
                <div className='book-cart-item'>
                    <NavLink to={`/books/${props.id}`}>
                        <img className='book-cart-image' src={book.volumeInfo.imageLinks.thumbnail}></img>
                    </NavLink>
                    <div className='book-cart-info'>
                        <div className='book-cart-title'>
                            <div className='title'>{book.volumeInfo.title}</div>
                            <div>{book.volumeInfo.authors.join(", ")}</div>
                        </div>
                        <div className='book-cart-pricing'>
                            <div className='book-cart-price'>€{book.saleInfo.retailPrice.amount}</div>
                            <div className='book-cart-quantity'>
                                <button onClick={() => removeFromCart(props.id, book.saleInfo.retailPrice.amount)}>-</button>
                                <div className='book-cart-quantity-number'>{props.quantity}</div>
                                <button onClick={() => addToCart(props.id, book.saleInfo.retailPrice.amount)}>+</button>
                            </div>
                            <div className='book-cart-subtotal'>{book.saleInfo.retailPrice.amount * props.quantity}€</div>
                        </div>
                    </div>
                </div>
            )}
        <hr></hr>
        </section>
    )
}