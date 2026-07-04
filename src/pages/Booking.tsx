import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import BreadCrumb from '../components/ui/BreadCrumb'
import HeroSection from '../components/HeroSection'
import CtaCard from '../components/CtaCard'
import BookingForm from '../components/BookingForm'
import BookingSummary from '../components/BookingSummary'
import { useState } from 'react'
import type { BookingData } from '../types'
const dataHero ={
  title: "Book Your Stay",
  heading: "Complete Your Reservation",
  description:
    "You're just one step away from your perfect stay. Fill in your details and confirm your booking securely."
}
const ctaData = {
  title: "Need Assistance?",
  heading: "Have Questions Before Booking?",
  description:
    "Our support team is available 24/7 to help you with your reservation, payment, or any special requests."
} 

function Booking() {
  const [bookingData, setBookingData] = useState<BookingData>({
  fullName: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  paymentMethod: "hotel",
  specialRequest: "",
});

const selectedRoom = {
  id: 2,
  name: "Deluxe Room",
  price: 4500,
  rating: 4.8,
  is_available: true,
  description: "Luxury room with city view.",
  amenities: [
    "Free WiFi",
    "Breakfast",
    "Mini Bar",
    "Balcony",
  ],
  image: "✨",
};
  return (
    <>
    <Navbar/>
    <div className="container-fluid py-2" style={{background:"var(--color-bg-primary)"}}>
      <div className="container">
      <BreadCrumb currentPage={"booking"}/> 
    </div>
    </div>
    <HeroSection dataHero={dataHero}/>
    <div className="container py-5">
  <div className="row g-4">

    <div className="col-lg-8">
      <BookingForm bookingData={bookingData} setBookingData={setBookingData}/>
    </div>

    <div className="col-lg-4">
      <BookingSummary room={selectedRoom}
     bookingData={bookingData}/>
    </div>

  </div>
</div>
<div className="container py-4">
  <CtaCard ctaData={ctaData}/>
</div>
    <Footer/>
    </>
  )
}

export default Booking