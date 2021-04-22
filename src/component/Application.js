  
import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {auth} from "../firebase";

import Quiz from "./Quiz";
import { UserContext } from "../providers/UserProvider";

function Application() {
  const state = useContext(UserContext);
  if (!state.user){
  
    return( 
    <Router>
         {/* <SignUp path="signUp" /> */}
         <SignIn path="/" />
    </Router>)
    

  } else if(state.loginAttempt === 2){
    return(
      <div className="app question-section grid place-items-center">
        <h1>Access denied. You have passed login attempts permitted!</h1>
        <button onClick={() => {
          auth.signOut()}}>Exit</button>
          
      </div>
    )
  }
   
  else {
    return( 
      <Quiz />
    )
    
  }
  // return (
    
  //       state.user ? <Quiz data={state.querySnapshot} loginAttempt={state.loginAttempt} user={state.user}/>
  //     :
  //       <Router>
  //         <SignUp path="signUp" />
  //         <SignIn path="/" />
          
  //       </Router>
      
  // );
}

export default Application;