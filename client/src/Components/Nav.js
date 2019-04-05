import React from "react";
import { NavLink } from "react-router-dom";


const Nav = () => {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
    </nav>
  )
}

export default Nav;