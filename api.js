const apiKey = "AIzaSyC6N-bnWSwnavX8VnzWow6yEO2E-Vwb_aA"
const maxResults = 40

export async function getBooks(searchTerm, orderBy="relevance") {
    //get the search term, and select a random letter if no search term entered
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const randomLetter = alphabet[Math.floor(Math.random()*alphabet.length)]
    const finalSearchTerm = searchTerm ? searchTerm : randomLetter
    const url = `https://www.googleapis.com/books/v1/volumes?q=${finalSearchTerm}&maxResults=${maxResults}&orderBy=${orderBy}&printType=books&filter=paid-ebooks&key=${apiKey}`
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.status);
    }

    const results = await response.json()
    return results.items
}

export async function getBook(id) {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.status);
    }

    const results = await response.json()
    return results
}