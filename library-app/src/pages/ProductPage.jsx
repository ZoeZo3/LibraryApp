import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getBook } from '../../utils'

export async function loader({ params }) {
    const book = await getBook(params.id)
    return book
}

export default function ProductPage() {
    const book = useLoaderData()

    return (
        <section className='book'>
            <img className='book-image' src={book.volumeInfo.imageLinks.medium}></img>
            <div className='book-info'>
                <h2>{book.volumeInfo.title}</h2>
                <h5>{book.volumeInfo.authors.join(", ")}</h5>
                <p>{book.volumeInfo.description}</p>
            </div>
        </section>)
}