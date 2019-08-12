import React, {Component} from 'react';
import './App.css';
import Feed from './Components/Feed/Feed'
import SideMenu from './Components/SideMenu/SideMenu'

export default class App extends Component{
  constructor(){
    super()
    this.state = {
      source: 'the-new-york-times',
      sideMenuOpen: false
    }
  }

  toggleMenu = (event) =>{
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen
    })
  }


  changeSource = (source) => {
    this.setState({source: source})
  }


  render(){
    const {source, sideMenuOpen} = this.state
    return (
      <div id="app" className='pageWrapper'>
        <SideMenu  source={source} 
          changeSource={this.changeSource} 
          toggleMenu={this.toggleMenu} 
          sideMenuOpen={sideMenuOpen}
        />

        <Feed source={source} 
          changeSource={this.changeSource} 
          toggleMenu={this.toggleMenu} 
          sideMenuOpen={sideMenuOpen}
        />
      </div>
    )
  }


}
