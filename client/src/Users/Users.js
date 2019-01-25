import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
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
        console.log(response.data);
        this.setState({
          user: response.data.users
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h2>Here are some jokes:</h2>
        {this.state.users.map(user => (
          <div className="box" key={user.id}>
            <p>Joke: {user.joke}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Users;
