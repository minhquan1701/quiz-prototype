import React, { Component, createContext, useState } from "react";
import { auth, firestore } from "../firebase";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    loginAttempt: 0,
    quizCode: ""
  };
 
  
  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      
      if (user){
      
       this.setState({user: user.email});
     
        // this.setState({quizCode: sessionStorage.getItem('quizCode')});
        
        firestore.collection("users").doc(user.email).get().then((doc) => {
          //  this.setState({quizCode: doc.data().quizCode})
           
          
          this.setState({loginAttempt: doc.data().loginAttempt});
            
            //Fetch questions based on quiz code.
           

        }).catch(() => console.error("can't get user"));
        
        
      } 
      else{
        this.setState({user: null, querySnapshot: []})
        
        
      }
      
      
    });


  };

  render() {
    //const { user } = this.state;
   
    return (
      
      <UserContext.Provider value={this.state}>
        
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;



// function UserProvider({children}) {
//   const [loginQuizCode, setQuizCode] = useState('');
//   const [state, setState] = useState({
//     user: null,
//     loginAttempt: 0
//   })
//   return (
//     <UserContext.Provider value={state} >
//       {React.cloneElement(children, setQuizCode)}
//     </UserContext.Provider>
//   )
// }

// export default UserProvider
