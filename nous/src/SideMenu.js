import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'
// import ColorKey from './ColorKey'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


export default class SideMenu extends Component {
  constructor(props){
    super(props)
      this.state = ({
        sideMenuOpen: this.props.sideMenuOpen
      })
  }


  render (props) {

    return (
      <div id="mySidenav" className='sidenav' style={{width: this.props.sideMenuOpen ? 200 : 0 }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Outlet changeSource={this.props.changeSource} source={this.props.source}/>
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
}
