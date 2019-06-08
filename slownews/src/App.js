import React, {Component} from 'react';
import './App.css';
import Feed from './Feed'

export default class App extends Component{

 componentDidMount () {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
        .then((users) => {
          // console.log(users)
          this.setState({
            users: users
          })
        })
        // console.log(this.state)
  }

  getUser = () => {
    return this.state.users.filter(user => (user.first === 'Maybe'))[0]

  }

  render(){
    return(
        <div>
          <h1 align="center">Slow News</h1>
            {this.state && this.state.users &&
              <Feed user={this.getUser()}/>
            }
        </div>
    )
  }


}
// {console.log('geetusr',this.getUser())}
