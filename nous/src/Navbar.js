import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class NavBar extends Component {



  render(props) {
    return (
      <div class="navbar">
        <h1><i class="fa fa-bars" aria-hidden="true"></i></h1>
        <Link to="/"><h1 className='banner'>NOUS</h1></Link>
        <Link to="/login"><h1><i class="fa fa-fw fa-user"></i>Login</h1></Link>
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
