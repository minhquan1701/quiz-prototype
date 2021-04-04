  
import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import Quiz from "./Quiz";
import { UserContext } from "../providers/UserProvider";

function Application() {
  const user = useContext(UserContext);
  return (
        user ?
        <Quiz />
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          
        </Router>
      
  );
}

export default Application;