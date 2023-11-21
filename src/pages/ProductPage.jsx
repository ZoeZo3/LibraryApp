import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getBook } from '../../api'
import { ShopContext } from '../context/ShopContext'

export async function loader({ params }) {
    const book = await getBook(params.id)
    return book
}

export default function ProductPage() {
    const book = useLoaderData()
    const { addToCart, totalCart } = useContext(ShopContext)

    return (
        <section className='book'>
            <img className='book-image' src={book.volumeInfo.imageLinks.medium}></img>
            <div className='book-info'>
                <h2>{book.volumeInfo.title}</h2>
                <h5>{book.volumeInfo.authors.join(", ")}</h5>
                <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></p>
                <b>{book.saleInfo.retailPrice.amount}€</b>
                <button className="add-to-cart" onClick={() => addToCart(book.id, book.saleInfo.retailPrice.amount)}>&#128722; Add to cart</button>
            </div>
        </section>)
}