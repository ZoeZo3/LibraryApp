 import React, { createContext, useState } from 'react'
 
 export const ShopContext = createContext(null)
 
 export default function shopContextProvider() {
  const [cartItems, setCartItems] = useState({})
   return (
     <ShopContext.Provider>Shopcontext</ShopContext.Provider>
   )
 }
 
