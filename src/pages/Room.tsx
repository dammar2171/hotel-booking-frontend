import { useState } from 'react'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import HeroSection from '../components/HeroSection'
import FilterSection from '../components/FilterSection'
import type { Room } from '../types'
import RoomCard from '../components/RoomCard'

const rooms: Room[] = [
  {
    id: 1,
    name: "Standard Room",
    price: 2000,
    rating: 4.3,
    is_available: true,
    description:
      "A cozy room ideal for solo travelers and short business trips.",
    amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Breakfast"],
    image: "🏠",
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 4500,
    rating: 4.7,
    is_available: true,
    description:
      "Enjoy extra space, a king-size bed, and a beautiful city view.",
    amenities: [
      "Free WiFi",
      "King Bed",
      "Mini Bar",
      "Balcony",
      "Breakfast",
    ],
    image: "✨",
  },
  {
    id: 3,
    name: "Executive Suite",
    price: 8500,
    rating: 4.9,
    is_available: false,
    description:
      "Luxury suite with a separate living room and premium amenities.",
    amenities: [
      "Free WiFi",
      "Living Room",
      "Jacuzzi",
      "Mini Bar",
      "Room Service",
    ],
    image: "👑",
  },
  {
    id: 4,
    name: "Family Room",
    price: 5500,
    rating: 4.6,
    is_available: true,
    description:
      "Perfect for families with spacious interiors and multiple beds.",
    amenities: [
      "Free WiFi",
      "2 Queen Beds",
      "Breakfast",
      "Smart TV",
      "Parking",
    ],
    image: "👨‍👩‍👧‍👦",
  },
  {
    id: 5,
    name: "Premium Suite",
    price: 12000,
    rating: 5.0,
    is_available: true,
    description:
      "Experience world-class luxury with panoramic views and VIP service.",
    amenities: [
      "Private Balcony",
      "Jacuzzi",
      "Butler Service",
      "Mini Bar",
      "Free Breakfast",
    ],
    image: "🌟",
  },
  {
    id: 6,
    name: "Budget Room",
    price: 1500,
    rating: 4.1,
    is_available: false,
    description:
      "Affordable room with all essential facilities for a comfortable stay.",
    amenities: [
      "Free WiFi",
      "Fan",
      "TV",
      "Daily Housekeeping",
    ],
    image: "💰",
  },
  {
    id: 7,
    name: "Honeymoon Suite",
    price: 10000,
    rating: 4.8,
    is_available: true,
    description:
      "Romantic suite specially designed for couples with premium décor.",
    amenities: [
      "King Bed",
      "Rose Decoration",
      "Jacuzzi",
      "Champagne",
      "Balcony",
    ],
    image: "💕",
  },
  {
    id: 8,
    name: "Business Room",
    price: 6000,
    rating: 4.5,
    is_available: true,
    description:
      "Designed for business travelers with a work desk and high-speed internet.",
    amenities: [
      "Work Desk",
      "High-Speed WiFi",
      "Coffee Machine",
      "Breakfast",
      "Meeting Access",
    ],
    image: "💼",
  },
];

const dataHero ={
  title:"Our Rooms",
  heading:"Find your perfect stay",
  description:"Browse our collection of comfortable and luxurious rooms, thoughtfully designed to suit every traveler. Whether you're here for business or leisure, we have the perfect room for you."
}
function Room() {
  const [search, setSearch] = useState("");
const [roomType, setRoomType] = useState("");
const [availability, setAvailability] = useState("");
const [priceRange, setPriceRange] = useState("");
  return (
    <>
      <Navbar/>
      <HeroSection dataHero={dataHero}/>
      <FilterSection
  search={search}
  roomType={roomType}
  availability={availability}
  priceRange={priceRange}
  onSearchChange={setSearch}
  onRoomTypeChange={setRoomType}
  onAvailabilityChange={setAvailability}
  onPriceRangeChange={setPriceRange}
  onReset={() => {
    setSearch("");
    setRoomType("");
    setAvailability("");
    setPriceRange("");
  }}
/>

{/* room card */}
<div className="container py-5">
  <div className="row g-4">
    {rooms.map((room) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>
</div>
      <Footer/>
    </>
  )
}

export default Room