import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:5000/api/register";

    axios
      .post(endpoint, this.state)
      .then(response => {
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            type="text"
            value={this.state.username}
          />
          <input
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
          <button>Register</button>
        </form>
      </>
    );
  }
}

export default SignUp;
