import { HeroSection } from '../../components/hero-section/HeroSection.jsx'
import { HeaderNav } from '../../components/HeaderNav.jsx'
import { CategoryGrid } from '../../components/grids/CategoryGrid.jsx'
import { SellestProducts } from '../../components/products-sections/SellestProducts.jsx'
import { CollectionsGrid } from '../../components/grids/CollectionsGrid.jsx'
import { FeaturedProducts } from '../../components/products-sections/FeaturedProducts.jsx'
import { SubscribeForm } from '../../components/forms/SubscribeForm.jsx'
import { ErFooter } from '../../components/ErFooter.jsx'

export function AppClient({products}) {
    return(
        <>
            <HeaderNav />
            <HeroSection />
            <CategoryGrid />
            <SellestProducts products={products}/>
            <CollectionsGrid />
            <FeaturedProducts products={products}/>
            <SubscribeForm />
            <ErFooter />
        </>
    )
}
