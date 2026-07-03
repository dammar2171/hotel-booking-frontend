import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
const Footer = () =>{
  return <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
    <a
      href="/"
      className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
    >
      <h3>H<span style={{color:"var(--color-accent)"}}>B</span>C</h3>
    </a>
    <span className="mb-3 mb-md-0 text-body-secondary">
      © 2026 HBC, company
    </span>
  </div>
  <ul className="nav mb-3 col-md-4 justify-content-end list-unstyled d-flex">
    <li className="ms-1">
      <a className="text-body-secondary" href="#" aria-label="Instagram">
        <GrInstagram />
      </a>
    </li>
    <li className="ms-3">
      <a className="text-body-secondary" href="#" aria-label="Facebook">
        <FaFacebook />
      </a>
    </li>
  </ul>
</footer>
  </div>
}
export default Footer;