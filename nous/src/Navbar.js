import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class NavBar extends Component {



  render(props) {
    return (
      <div className='NavBar'>
        <h1>NOUS</h1>
        <h3>Click on story to display its emotional impact as a color</h3>
        <Outlet changeSource={this.props.changeSource} user={this.props.user} source={this.props.source}/>
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      </div>

    )
  }

}
