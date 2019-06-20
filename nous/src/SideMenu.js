import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'

// import Outlet from './Outlet'
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


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
        <a href="#" class="closebtn" onclick="closeNav()"></a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
          <Outlet changeSource={this.props.changeSource} source={this.props.source}/>

      </div>
    )
  }
}

// <div className='NavBar'>
//   <h1 className='banner'>NOUS</h1>
//   <h3>Click on story to display its emotional impact as a color</h3>
//   <Outlet changeSource={this.props.changeSource} source={this.props.source}/>
//   <ul>
//   <li>
//     <Link to="/">Home</Link>
//   </li>
//   <li>
//     <Link to="/login">Login</Link>
//   </li>
//   <li>
//     <Link to="/signup">Sign up</Link>
//   </li>
//   <li>
//     <Link to="/about">About</Link>
//   </li>
//   <li>
//     <Link to="/contact">Contact</Link>
//   </li>
// </ul>
// </div>
