import { useEffect, useState } from 'react'
import { HeroSection } from '../../components/hero-section/HeroSection.jsx'
import { HeaderNav } from '../../components/HeaderNav.jsx'
import { CategoryGrid } from '../../components/grids/CategoryGrid.jsx'
import { SellestProducts } from '../../components/products-sections/SellestProducts.jsx'
import { FeaturedProducts } from '../../components/products-sections/FeaturedProducts.jsx'
import { CollectionsGrid } from '../../components/grids/CollectionsGrid.jsx'
import { SubscribeForm } from '../../components/forms/SubscribeForm.jsx'
import { ErFooter } from '../../components/ErFooter.jsx'
import { SearchModal } from '../../components/modals/SearchModal.jsx'
import { LoginModal } from '../../components/modals/LoginModal.jsx'
import { CartModal } from '../../components/modals/CartModal.jsx'
import { getProducts } from '../../api/products.api.js'

export function HomePage() {

    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    const [searchOpen, setSearchOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await getProducts()

                setProducts(response.data)
            }catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    const refreshCartItems = () => {
        setCartItems(JSON.parse(localStorage.getItem('cart')) || [])
    }

    const handleSearch = (query) => {
        console.log('Buscar:', query)
    }

    const handleOpenCart = () => {
        refreshCartItems()
        setCartOpen(true)
    }

    const handleAddToCart = () => {
        refreshCartItems()
        setCartOpen(true)
    }

    return(
        <>
            <HeaderNav
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                onOpenCart={handleOpenCart}
            />

            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                products={products}
                onSearch={handleSearch}
            />
            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
            <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} />

            <HeroSection />
            <CategoryGrid />
            <FeaturedProducts
            products={products.slice(0,10)}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            />
            <CollectionsGrid />
            <SellestProducts
            products={products.slice(11,21)}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            />
            <SubscribeForm />
            <ErFooter onOpenLogin={() => setLoginOpen(true)} />
        </>
    )
}
