import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import About from './About'
import Login from './Login'
import Signup from './Signup'

import Contact from './Contact'

const routing = (
  <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path="/contact" component={Contact}/>
      </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
