import React, { Component } from "react";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/jokes`;
    const token = localStorage.getItem("jwt");

    const requestOptions = {
      headers: {
        authorization: token
      }
    };

    axios
      .get(endpoint, requestOptions)
      .then(response => {
        this.setState({
          jokes: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h2>Here are some jokes:</h2>
        {this.state.jokes.map(joke => (
          <div className="box" key={joke.id}>
            <p>{joke.joke}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Jokes;
