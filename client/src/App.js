import React, { Component } from 'react';
import Nav from "./Components/Nav"
import Routes from "./Components/Routes"

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
