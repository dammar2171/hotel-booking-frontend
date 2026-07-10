import { useEffect, useState } from 'react'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import HeroSection from '../components/HeroSection'
import FilterSection from '../components/FilterSection'
import type { Room } from '../types'
import RoomCard from '../components/RoomCard'
import { useRoom } from '../contexts/RoomContext'

const dataHero ={
  title:"Our Rooms",
  heading:"Find your perfect stay",
  description:"Browse our collection of comfortable and luxurious rooms, thoughtfully designed to suit every traveler. Whether you're here for business or leisure, we have the perfect room for you."
}
function RoomPage() {
const [search, setSearch] = useState("");
const [roomType, setRoomType] = useState("");
const [availability, setAvailability] = useState("");
const [priceRange, setPriceRange] = useState("");

const {rooms,fetchRooms} = useRoom();

useEffect(()=>{fetchRooms();},[fetchRooms]);

const filtered = rooms.filter((room) => {
  const matchSearch = room.type.toLowerCase().includes(search.toLowerCase()) ||
    room.room_number.toLowerCase().includes(search.toLowerCase());
  const matchType   = roomType === "" || room.type.toLowerCase() === roomType.toLowerCase();
  const matchAvail  = availability === ""
    || (availability === "available" && room.is_available)
    || (availability === "booked"    && !room.is_available);
  const matchPrice =
  priceRange === "" ||
  (priceRange === "Low" && room.price <= 5000) ||
  (priceRange === "Medium" &&
    room.price > 5000 &&
    room.price <= 10000) ||
  (priceRange === "High" &&
    room.price > 10000 &&
    room.price <= 50000) ||
  (priceRange === "ultraHigh" &&
    room.price > 50000);
  return matchSearch && matchType && matchAvail && matchPrice;
});
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
    {filtered.length === 0 ? <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>🛏️</div>
            <h4>No rooms found</h4></div> : filtered.map((room) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>
</div>
      <Footer/>
    </>
  )
}

export default RoomPage;