import React, { useState } from "react";
import { auth, firestore } from "../firebase";



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quizCode, setQuizCode] = useState('');
  const [error, setError] = useState(null);

  // const isValidEmail = () => {
  //   break;
  // }

  const signInWithEmailAndPasswordHandler =
    (event, email, password, quizCode) => {
      event.preventDefault();
      
      

      firestore.collection(quizCode).get().then((snapshot) => {
        if (snapshot.docs.length) {
          sessionStorage.setItem('quizCode', quizCode);

          auth.signInWithEmailAndPassword(email, password)
              .catch(error => {
                setError("Invalid email or password");
                console.error(error);
              })
          
            // firestore.collection("users").doc(email).update({ quizCode: quizCode })
            // .then(() => console.log('quiz written'))
            // .then(() => {
            //   auth.signInWithEmailAndPassword(email, password)
            //   .catch(error => {
            //     setError("Invalid email or password");
            //     console.error(error);
            //   })
            // })
            // .catch(error => {
            //   setError("Invalid Email");
            //   console.error(error);
            // });

            
            

        } else {
          setError("No quiz code found");
        }
      })


      // if (firestore.collection(quizCode).isEqual(quizCode)) {

      //   auth.signInWithEmailAndPassword(email, password).catch(error => {
      //     setError("Error signing in with password and email!");
      //     console.error("Error signing in with password and email", error);
      //   });



      // }else{
      //   console.log(quizCode);
      //   setError("No quiz code found!");
      // }


      document.querySelector('form').reset();





      //             auth.signInWithEmailAndPassword(email, password).catch(error => {
      //   setError("Error signing in with password and email!");
      //   console.log("Error signing in with password and email", error);
      // });

    };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    
    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    } else if (name === 'userQuizCode') {
      setQuizCode(value);
    }


  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-96 rounded py-8 px-4 md:px-8">
        {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            style={{ color: 'black' }}
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="email:abc@xyz.com pass:123456"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
            style={{ color: 'black' }}
          />

          <label htmlFor="userQuizCode" className="block">
            Quiz Code:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="userQuizCode"
            value={quizCode}
            placeholder="afafdas"
            id="userQuizCode"
            onChange={(event) => onChangeHandler(event)}
            style={{ color: 'black' }}
          />
          <button className="bg-green-400 my-4 hover:bg-green-500 w-full py-2 text-white" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password, quizCode) }}>
            Sign in
          </button>
        </form>
        {/* <p className="text-center my-3">or</p>
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p> */}
      </div>
    </div>
  );
};
export default SignIn;