import { useState } from 'react'
import { HeroSection } from '../../components/hero-section/HeroSection.jsx'
import { HeaderNav } from '../../components/HeaderNav.jsx'
import { CategoryGrid } from '../../components/grids/CategoryGrid.jsx'
import { SellestProducts } from '../../components/products-sections/SellestProducts.jsx'
import { CollectionsGrid } from '../../components/grids/CollectionsGrid.jsx'
import { FeaturedProducts } from '../../components/products-sections/FeaturedProducts.jsx'
import { SubscribeForm } from '../../components/forms/SubscribeForm.jsx'
import { ErFooter } from '../../components/ErFooter.jsx'
import { SearchModal } from '../../components/modals/SearchModal.jsx'
import { LoginModal } from '../../components/modals/LoginModal.jsx'
import { CartModal } from '../../components/modals/CartModal.jsx'

export function AppClient({products}) {
    const [searchOpen, setSearchOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    const handleSearch = (query) => {
        console.log('Buscar:', query)
    }

    return(
        <>
            <HeaderNav
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                onOpenCart={() => setCartOpen(true)}
            />

            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                products={products}
                onSearch={handleSearch}
            />
            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
            <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

            <HeroSection />
            <CategoryGrid />
            <SellestProducts products={products}/>
            <CollectionsGrid />
            <FeaturedProducts products={products}/>
            <SubscribeForm />
            <ErFooter onOpenLogin={() => setLoginOpen(true)} />
        </>
    )
}
