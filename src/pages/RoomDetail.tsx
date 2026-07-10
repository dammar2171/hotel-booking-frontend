import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import BreadCrumb from '../components/ui/BreadCrumb'
import RoomHero from '../components/RoomHero'
import CtaCard from '../components/CtaCard'
import { useRoom } from '../contexts/RoomContext'
import { useParams } from 'react-router'
const ctaData = {
  title: "Book Your Stay",
  heading: "Ready to Experience Comfort and Luxury?",
  description:
    "Reserve your room today and enjoy premium amenities, exceptional hospitality, and an unforgettable stay at the best available rates.",
};

function RoomDetail() {
  const {rooms} = useRoom();
  const {id} = useParams();

  const selectedRoom = rooms.find((room)=> room.id === Number(id));
  
  if (!selectedRoom) return <div>Room not found</div>;
  
  return (
    <>
      <Navbar/>
      <div className="container-fluid py-2" style={{background: "var(--color-bg-primary)"}}>
        <div className="container" >
        <BreadCrumb currentPage='bookDetails'/>
      </div> 
      <RoomHero room={selectedRoom as any}/>
      <div className="container pb-5" style={{background: "var(--color-bg-primary)"}}>
        <CtaCard ctaData={ctaData}/>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default RoomDetail