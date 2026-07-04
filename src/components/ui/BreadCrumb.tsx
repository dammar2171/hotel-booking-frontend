import { NavLink } from 'react-router'
interface BreadCrumbProps{
  currentPage:string;
}
function BreadCrumb({currentPage}:BreadCrumbProps) {
  return (
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <NavLink to="/rooms">Back</NavLink>
    </li>
    <li className="breadcrumb-item active" aria-current="page">
      {currentPage}
    </li>
  </ol>
</nav>
  )
}

export default BreadCrumb