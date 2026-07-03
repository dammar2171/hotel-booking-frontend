import Footer from '../components/layouts/Footer'
import Navbar from '../components/layouts/Navbar'
import styles from '../styles/Home.module.css'
export default function Home(){
  return <>
  <Navbar/>
  <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className={`col-12 ${styles.heroSection} `}>
          <h1>Welcome</h1>
          <p>To Hotel Booking System</p>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </>
}