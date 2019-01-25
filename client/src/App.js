import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";
import './App.css';

import Users from "./Users/Users"


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <nav>
            <NavLink exact to="/">Jokes</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
          </nav>
          <main>
            <Route exact path="/" component={Users} />
            
          </main>
        </div>
      </div>
    );
  }
}

export default App;
