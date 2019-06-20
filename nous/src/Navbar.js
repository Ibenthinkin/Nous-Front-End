import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SideMenu from './SideMenu'

export default class NavBar extends Component {


  render(props) {
    return (
      <div class="navbar">
        <i onClick={this.props.toggleMenu} className="fa fa-bars" aria-hidden="true"></i>
        <Link to="/"><h1 className='banner'>NOUS</h1></Link>
        <Link to="/login"><h1><i class="fa fa-fw fa-user"></i></h1></Link>
      </div>


    )
  }

}
