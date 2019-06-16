import React, {Component} from 'react';
import './App.css';
import Feed from './Feed'

export default class App extends Component{

 componentDidMount () {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
        .then((users) => {
          this.setState({
            users: users,
            source: 'the-new-york-times'
          })
        })
  }

  // getUser = () => {
  //   return this.state.users.filter(user => (user.first === 'Maybe'))[0]
  // }



  render(){
    return(
        <div>
            {this.state && this.state.users &&
              <Feed users={this.state.users} source={this.state.source}/>
            }
        </div>
    )
  }


}
