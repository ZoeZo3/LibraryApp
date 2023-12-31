import { useState } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom"
import Homepage, { loader as loaderHomepage } from './src/pages/Homepage'
import ListingPage, { loader as loaderListingPage } from './src/pages/ListingPage'
import ProductPage, { loader as loaderProductPage } from './src/pages/ProductPage'
import Cart from './src/pages/Cart'
import Layout from './src/components/Layout'
import Error from './src/components/Error'
import NotFound from './src/components/NotFound'
import { action as actionHeader } from './src/components/Header'
import { ShopContextProvider } from './src/context/ShopContext'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout /> } action={actionHeader}>
    <Route index element={<Homepage />} loader={loaderHomepage}/>
    <Route path="books" element={<ListingPage /> } loader={loaderListingPage} errorElement={<Error />}/>
    <Route path="books/:id" element={<ProductPage />} loader={loaderProductPage}  errorElement={<Error />}/>
    <Route path="cart" element={<Cart />} errorElement={<Error />}/>
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {

  return (
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  )
}

export default App
