import Carousel from '../components/Carousel'
import Services from '../components/Services'
import FeaturedProducts from '../components/FeaturedProducts'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Carousel />
      <Services />
      <FeaturedProducts />
    </div>
  )
}
