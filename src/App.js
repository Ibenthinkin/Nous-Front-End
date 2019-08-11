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
    return(
      <div id="app" className='pageWrapper'>
        <SideMenu  source={this.state.source} changeSource={this.changeSource} toggleMenu={this.toggleMenu} sideMenuOpen={this.state.sideMenuOpen}/>
          <Feed source={this.state.source} changeSource={this.changeSource} toggleMenu={this.toggleMenu} sideMenuOpen={this.state.sideMenuOpen}/>
      </div>
    )
  }


}
