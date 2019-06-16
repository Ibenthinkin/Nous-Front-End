import React, {Component} from 'react'
import './App.css';
import Outlet from './Outlet'

export default class TitleCard extends Component {



  render(props) {
    return (
      <div className='TitleCard'>
        <h1>NOUS</h1>
        <h3>Click on story to display its emotional impact as a color</h3>
        <Outlet changeSource={this.props.changeSource} user={this.props.user} source={this.props.source}/>
      </div>

    )
  }

}
