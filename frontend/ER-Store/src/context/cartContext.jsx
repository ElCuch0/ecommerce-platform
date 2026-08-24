import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCart, addToCart as addToCartApi, updateCartItem, removeFromCart } from '../api/cart.api.js'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext()

function normalizeCartResponse(response) {
    const payload = response?.data ?? response
    return payload?.cart ?? payload ?? { items: [] }
}

export function CartProvider({ children }) {
    const { user } = useAuth()
    const [ cart, setCart ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const fetchCart = async () => {
        if (!user) {
            setCart(null)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await getCart()
            setCart(normalizeCartResponse(response))
        }catch (error) {
            if (error.status === 404) {
                setCart({ items: [] })
                return
            }

            setError(error.message || "Error al obtener el carrito")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [user])

    const addItem = async ( productId, quantity = 1 ) => {
        try {
            setError(null)

            const response = await addToCartApi({
                productId,
                quantity
            })

            setCart(normalizeCartResponse(response))
        }catch (error) {
            setError(error.message || "Error al cargar el carrito")
            throw error
        }
    }

    // Actualizar la cantidad de un elemento
    const updateQuantity = async (itemId, quantity) => {
        try {
            setError(null)

            const response = await updateCartItem(
                itemId,
                quantity
            )

            await fetchCart()
            return response
        }catch (error) {
            setError(error.message || "Error al actualizar la cantidad")
            throw error
        }
    }

    // Eliminar un elemento del carrito
    const removeItem = async (itemId) => {
        try {
            setError(null)

            await removeFromCart(itemId)

            await fetchCart()
        }catch (error) {
            setError(error.message || "Error al eliminar del carrito")
            throw error
        }
    }

    const items = cart?.items?.map((item) => ({
        ...(item.product ?? item),
        cartItemId: item.id,
        productId: item.productId,
        quantity: item.quantity
    })) || []
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <CartContext.Provider
        value={{
            cart,
            items,
            loading,
            error,
            totalItems,
            addItem,
            updateQuantity,
            removeItem,
            refreshCart: fetchCart,
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider")
    }
    
    return context
}
