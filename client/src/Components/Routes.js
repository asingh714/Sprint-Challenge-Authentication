import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Jokes from "./Jokes";

const Routes = () => {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/jokes" component={Jokes} />
    </main>
  );
};

export default Routes;
