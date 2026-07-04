import { NavLink } from 'react-router'
function BreadCrumb() {
  return (
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <NavLink to="/rooms">Back</NavLink>
    </li>
    <li className="breadcrumb-item active" aria-current="page">
      Room Details
    </li>
  </ol>
</nav>
  )
}

export default BreadCrumb