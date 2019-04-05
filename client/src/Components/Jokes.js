import React from "react";
import axios from "axios";

import requiresAuth from "./auth/requiresAuth";

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const endpoint = "/jokes";

    axios
      .get(endpoint)
      .then(response => {
        this.setState({
          jokes: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h2>Jokes:</h2>
        {this.state.jokes.map(joke => (
          <div key={joke.id} className="joke-container">
            <p>{joke.joke}</p>
          </div>
        ))}
      </>
    );
  }
}

export default requiresAuth(Jokes);
