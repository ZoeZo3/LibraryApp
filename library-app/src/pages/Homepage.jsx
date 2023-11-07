import React, { Suspense, useState } from "react";
import { useLoaderData, Link, Await } from "react-router-dom"
import { getBooks } from "../../utils";

export async function loader() {
    return {books: await getBooks(undefined)} //, "newest"
}

export default function Homepage() {
    const dataPromise = useLoaderData()    

    function renderBooks(books) {
        const books_filtered = books.filter(book =>
            book.volumeInfo.imageLinks && book.volumeInfo.authors && book.saleInfo.saleability == "FOR_SALE"
            )

        const [currentIndex, setCurrentIndex] = useState(0);
        
        const handleNextClick = () => {
            if (currentIndex < books_filtered.length - 3) {
                setCurrentIndex(index => index + 1)
            }
        }

        const handlePrevClick = () => {
            if (currentIndex >= 1) {
                setCurrentIndex(index => index - 1)
            }
        }
    
        const bookElements = books_filtered.slice(currentIndex, currentIndex + 3).map((book, index) => {
            return (
                <Link className="book-card carousel-item" key={index} to={`books/${book.id}`}>
                    <div className="book-card-img">
                        <img src={book.volumeInfo.imageLinks.thumbnail} />
                    </div>
                        <p className="book-card-title">
                            <b>{book.volumeInfo.title}</b>
                        </p>
                    <p><small>{book.volumeInfo.authors.join(', ')}</small></p>
                </Link>
            )
        })

        return (
            <div className="carousel">
                <button className="carousel-button" onClick={handlePrevClick} disabled={currentIndex === 0}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="carousel-items">
                    {bookElements}
                </div>
                <button className="carousel-button" onClick={handleNextClick} disabled={currentIndex === books_filtered.length - 3}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
    )}


    return (
        <div>
            <h1>Newest books</h1>
            <Suspense fallback={<h2 style={{ display: 'flex', marginTop: '60px'}}>Loading books...</h2>}>
                <Await resolve={dataPromise.books}>
                    {renderBooks}
                </Await>
            </Suspense>  
        </div>
    )}
