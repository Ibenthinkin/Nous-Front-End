import React from 'react'
import Outlet from '../Outlet/Outlet'
import {Link} from 'react-router-dom'


 const SideMenu = ({sideMenuOpen, source, changeSource}) => {
    return (
      <div id="mySidenav" className='sidenav' style={{width: sideMenuOpen ? 200 : 0 }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Outlet changeSource={changeSource} source={source}/>
            <div className='ColorKey'>
              <div className='colorSwatch blue' style={{backgroundColor:`rgba(164,210,212,1)`}}>
                <p>Positive</p>
              </div>
              <div className='colorSwatch yellow' style={{backgroundColor:`rgba(247,	200,	40,	1)`}}>
                <p>Neutral</p>
              </div>
              <div className='colorSwatch red' style={{backgroundColor:`rgba(219,	29,	19,	1)`}}>
                <p>Negative</p>
              </div>
            </div>
      </div>
    )
  }


export default SideMenu;