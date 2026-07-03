import { useNavigate } from 'react-router';
import styles from '../../styles/Navbar.module.css'
const Navbar = () =>{
  const navigate = useNavigate();

  return <div className="container">
  <header className={`d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom ${styles.custumHeader}`}>
    <div className="col-md-3 mb-2 mb-md-0">
      <h1 className={`${styles.logo}`} onClick={()=>navigate("/")}>H<span className={styles.logoSpan}>B</span>S</h1>
    </div>
    <div className="col-md-3 text-end">
      <button type="button" onClick={()=>navigate("/login")} className= "btn me-2 btn-ghost">
        Login
      </button>
      <button type="button" onClick={()=>navigate("/register")} className="btn btn-accent" >
        Sign-up
      </button>
    </div>
  </header>
</div>

}
export default Navbar;