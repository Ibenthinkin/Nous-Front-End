import React, { Component } from 'react';
// import { Redirect, Route, Link } from 'react-router-dom';

export default class Signup extends Component {

  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      first:'',
      last:'',
      email: ''
    };
  } 

  handleSubmit = event => {
      event.preventDefault();
      this.sendSignup()
      this.setState({
        username: '',
        password: '',
        passwordConfirm: '',
        first:'',
        last:'',
        email: ''
      });
    };

    sendSignup = () =>{
      const { username, password, first, last, email } = this.state;
      fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          first: first,
          last: last,
          email: email
        }
      })
    })
      .then(r => r.json())
      .then(r => this.handleResponse(r))
      .catch(error => {
      console.error(error.message);
    })
  }

  handleResponse = (r) => {
    if (r.jwt){
      localStorage.setItem('jwt', r.jwt)
      localStorage.setItem('email', r.user.email)
      localStorage.setItem('first', r.user.first)
      localStorage.setItem('last', r.user.last)
      localStorage.setItem('username', r.user.username)
      localStorage.setItem('email', r.user.email)
      this.setState({
        username: '',
        password: '',
        passwordConfirm: '',
        first:'',
        last:'',
        email: ''
      })
    } else {
      this.setState({
        username: '',
        password: '',
        passwordConfirm: '',
        first:'',
        last:'',
        email: ''
      })
    }
  }



  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password, passwordConfirm, first, last, email } = this.state;
    return (
    <div className='page'>
      <form className={'login-signup-form'} onSubmit={this.handleSubmit}>
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="firstname"
          name="first"
          onChange={this.handleChange}
          value={first}
        />
        <br />
        <input
          type="text"
          placeholder="lastname"
          name="last"
          onChange={this.handleChange}
          value={last}
        />
        <br />
        <input
          type="text"
          placeholder="something@gmail.com"
          name="email"
          onChange={this.handleChange}
          value={email}
        />
        <br />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={this.handleChange}
          value={username}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={this.handleChange}
          value={password}
        />
        <br />
        <input
          type="password"
          placeholder="confirm password"
          name="passwordConfirm"
          onChange={this.handleChange}
          value={passwordConfirm}
        />
        <br />

        <button className={'nice-button'} type="submit">
          Submit
        </button>
      </form>
    </div>
    );
  }
}
