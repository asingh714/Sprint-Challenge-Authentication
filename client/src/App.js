import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";
import './App.css';

import Jokes from "./Jokes/Jokes"
import SignIn from "./SignIn/SignIn"
// import SignUp from "./SignUp/SignUp"

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
            <Route exact path="/" component={Jokes} />
            <Route path="/signin" component={SignIn} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
