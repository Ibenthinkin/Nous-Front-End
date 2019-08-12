import React from 'react'
import { Link } from 'react-router-dom'

 const NavBar = (props) => {
    return (
      <div className="navbar">
        <i onClick={props.toggleMenu} className="fa fa-bars" aria-hidden="true"></i>
        <Link to="/"><h1 className='banner'>NOUS</h1></Link>
        <Link to="/login"><h1><i class="fa fa-fw fa-user"></i></h1></Link>
      </div>
    )
}

export default NavBar;