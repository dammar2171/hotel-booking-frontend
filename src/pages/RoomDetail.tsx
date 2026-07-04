import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import BreadCrumb from '../components/ui/BreadCrumb'
import HeroSection from '../components/HeroSection'
import RoomHero from '../components/RoomHero'
import type { Room } from '../types'
import CtaCard from '../components/CtaCard'
const dataHero ={
  title:"Our Rooms",
  heading:"Find your perfect stay",
  description:"Browse our collection of comfortable and luxurious rooms, thoughtfully designed to suit every traveler. Whether you're here for business or leisure, we have the perfect room for you."
}
const ctaData = {
  title: "Book Your Stay",
  heading: "Ready to Experience Comfort and Luxury?",
  description:
    "Reserve your room today and enjoy premium amenities, exceptional hospitality, and an unforgettable stay at the best available rates.",
};
const rooms: Room = {
    id: 1,
    name: "Standard Room",
    price: 2000,
    rating: 4.3,
    is_available: true,
    description:
      "A cozy room ideal for solo travelers and short business trips.",
    amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Breakfast"],
    image: "🏠",
  }
function RoomDetail() {
  return (
    <>
      <Navbar/>
      <div className="container-fluid py-2" style={{background: "var(--color-bg-primary)"}}>
        <div className="container" >
        <BreadCrumb/>
      </div> 
      <RoomHero room={rooms}/>
      <div className="container" style={{background: "var(--color-bg-primary)"}}>
        <CtaCard ctaData={ctaData}/>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default RoomDetail