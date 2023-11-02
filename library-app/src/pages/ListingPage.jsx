import React, { Suspense } from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom';
import { getBooks } from "../../utils";

export async function loader({ request }) {
    const searchTerm = new URL(request.url).searchParams.get("q")
    return defer({ books: getBooks(searchTerm) })
}

export default function ListingPage() {
    const dataPromise = useLoaderData()

    function renderBooks(books) {
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

        // filter out elements that don't have a description or image from the list
        const bookElementsDefined = bookElements.filter(book => book != undefined)

        return (
            <div>
              {bookElementsDefined.length > 0 ? (
                <div className="books-listing">
                  {bookElementsDefined}
                </div>) : (
                <h2 style={{ display: 'flex', marginTop: '60px'}}>
                  Sorry, we couldn't find any book corresponding to your search term.
                </h2>
              )}
            </div>
          );
    }

    return (
        <Suspense fallback={<h2 style={{ display: 'flex', marginTop: '60px'}}>Loading books...</h2>}>
            <Await resolve={dataPromise.books}>
                    {renderBooks}
            </Await>
        </Suspense>
    )
}