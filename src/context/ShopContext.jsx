 import React, { createContext, useState, useEffect } from 'react'
 
 export const ShopContext = createContext(null)
 
 export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {})
  const [totalCart, setTotalCart] = useState(localStorage.getItem('totalCart') ? JSON.parse(localStorage.getItem('totalCart')) : 0)
  const [nbItems, setNbItems] = useState(localStorage.getItem('nbItems') ? JSON.parse(localStorage.getItem('nbItems')) : 0)

  const addToCart = (itemId, itemPrice) => {
    setCartItems(prevCartItems => {
      if (Object.keys(prevCartItems).indexOf(itemId) > -1) {
        return {
          ...prevCartItems,
          [itemId]: prevCartItems[itemId] + 1
        }
      }
      else {
        return {
          ...prevCartItems,
          [itemId]: 1}
        }
      }
    )
    setTotalCart(prevTotal => (Math.round((prevTotal + itemPrice) * 100) / 100))
    setNbItems(prevNb => prevNb + 1)
  }

  const removeFromCart = (itemId, itemPrice) => {
    setCartItems(prevCartItems => {
      if (Object.keys(prevCartItems).indexOf(itemId) > -1) {
        return {
          ...prevCartItems,
          [itemId]: prevCartItems[itemId] - 1
        }
      }
      }
    )
    setTotalCart(prevTotal => (Math.round((prevTotal - itemPrice) * 100) / 100))
    setNbItems(prevNb => prevNb - 1)
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("totalCart", JSON.stringify(totalCart));
  }, [totalCart]);

  useEffect(() => {
    localStorage.setItem("nbItems", JSON.stringify(nbItems));
  }, [nbItems]);

  const contextValue = {cartItems, addToCart, removeFromCart, totalCart, nbItems}

  return (
     <ShopContext.Provider value= {contextValue}>{props.children}</ShopContext.Provider>
   )
 }
 
