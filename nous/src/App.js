import React, {Component} from 'react';
import './App.css';
import Feed from './Feed'
import SideMenu from './SideMenu'

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

 // componentDidMount () {
 //    fetch('http://localhost:3000/api/v1/users')
 //      .then(response => response.json())
 //        .then((users) => {
 //          this.setState({
 //            users: users,
 //            source: 'the-new-york-times'
 //          })
 //        })
 //  }

  // getUser = () => {
  //   return this.state.users.filter(user => (user.first === 'Maybe'))[0]
  // }

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

// {this.state && this.state.users &&
//   <Feed users={this.state.users} source={this.state.source} changeSource={this.changeSource}/>
// }
