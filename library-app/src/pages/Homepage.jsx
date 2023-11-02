import React from "react";
import { useLoaderData, Link } from "react-router-dom"
import { getBooks } from "../../utils";

export async function loader() {
    return await getBooks(undefined, "newest")
}

export default function Homepage() {
    const books = useLoaderData()
    console.log(books)

    const bookElements = books.map(book => {
        return (
            book.volumeInfo.imageLinks && book.volumeInfo.description && book.volumeInfo.authors &&
            <Link className="book-card" key={book.id} to={book.id}>
                <div className="book-card-img">
                    <img src={book.volumeInfo.imageLinks.thumbnail} />
                </div>
                <p><b>{book.volumeInfo.title}</b></p>
                <p><small>{book.volumeInfo.authors.join(', ')}</small></p>
            </Link>
        )
    })

    return (
        <div>
            <h1>Newest books</h1>
            <div className="books-listing">
                {bookElements}
            </div>
        </div>
    )}

    /*return (
        <Suspense fallback={<h2 style={{ display: 'flex', marginTop: '60px'}}>Loading books...</h2>}>
            <Await resolve={dataPromise.books}>
                    {renderBooks}
            </Await>
        </Suspense>
    )*/
