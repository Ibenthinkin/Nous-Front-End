import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super()  
      this.state = {
          username: '',
          password: ''
        };
    }
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      username: '',
      password: ''
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
 
    const { username, password } = this.state;
    return (
    <div className='page'>
      <form className={'login-signup-form'} onSubmit={this.handleSubmit}>
        <h1>Login</h1>
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
        <button className={'nice-button'} type="submit">
          Submit
        </button>
      </form>
    </div>
    );
  }
}
