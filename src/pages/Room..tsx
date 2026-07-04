import React from 'react'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import HeroSection from '../components/HeroSection'

const dataHero ={
  title:"Our Rooms",
  heading:"Find your perfect stay",
  description:"Browse our collection of comfortable and luxurious rooms, thoughtfully designed to suit every traveler. Whether you're here for business or leisure, we have the perfect room for you."
}
function Room() {
  return (
    <>
      <Navbar/>
      <HeroSection dataHero={dataHero}/>
      <Footer/>
    </>
  )
}

export default Room