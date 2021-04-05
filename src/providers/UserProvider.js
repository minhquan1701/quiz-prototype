import React, { Component, createContext } from "react";
import { auth, firestore } from "../firebase";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    querySnapshot: []
  };
  queryData = [];
  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(user => {
      if (user){
        this.setState({ user });
        firestore.collection("test-01").get().then((querySnapshot) => {
			if (querySnapshot) {
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.queryData.push(doc.data());
       
       this.setState({querySnapshot: [...this.queryData]})
       
    });
				this.queryData = [];
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});

        
      }else{
        this.setState({user: null, querySnapshot: []});
        this.queryData = [];
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