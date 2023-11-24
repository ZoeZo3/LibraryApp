import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartItemCard from '../components/CartItemCard'


export default function Cart() {
    const { cartItems, totalCart } = useContext(ShopContext)
    const cartItemsIds = Object.keys(cartItems)
    const [total, setTotal] = useState(0)

    const cart_items = cartItemsIds.map( id => {
        if (cartItems[id] > 0) {
          return (<CartItemCard
                key = {id}
                id = {id}
                quantity = {cartItems[id]}
            />)
        }       
    }).filter(item => item !== undefined)

    return (
        <>
        {cart_items.length > 0 ? (
            <section className='cart'>
                <h1>Your cart</h1>
                <div className='cart-items'>
                <div className='cart-header book-cart-item'>
                    <div style={{ width: '52%' }}>Book</div>
                    <div style={{ width: '13%' }}>Price</div>
                    <div style={{ width: '16%' }}>Quantity</div>
                    <div style={{ width: '8%' }}>Subtotal</div>
                </div>
                {cart_items}
                </div>
                <div className='total-price'>Total: {totalCart}€</div>
            </section>
            ) : (
                <section className='cart-items'>You don't have anything in your cart yet.</section>
            )}
        </>
    )
}