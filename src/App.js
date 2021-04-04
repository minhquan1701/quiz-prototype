
import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Application from "./component/Application";
import UserProvider from "./providers/UserProvider";
import Quiz from "./component/Quiz";
import { UserContext } from "./providers/UserProvider";
function App() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;