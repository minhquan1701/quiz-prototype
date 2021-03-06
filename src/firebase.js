import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBk5jvaGZMIhiv9KjcmBdanwa5rrJc5jdw",
    authDomain: "quiz-prototype-8b183.firebaseapp.com",
    projectId: "quiz-prototype-8b183",
    storageBucket: "quiz-prototype-8b183.appspot.com",
    messagingSenderId: "115402082201",
    appId: "1:115402082201:web:9d48ee23de1a0a0f94f508"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// let data = [
//     {
//         questionText: "How many soccer players should each team have on the field at the start of each match??",
//         answerOptions: [
//             {
//                 answerText: '10',
//                 isCorrect: false
//             },
//             {
//                 answerText: '11',
//                 isCorrect: false
//             },
//             {   
//                 answerText: '12',
//                 isCorrect: false
//             },
//             {   
//                 answerText: '16',
//                 isCorrect: false
//             }
            
//         ]
        
        
//     },
//     {
//         questionText: "When Michael Jordan played for the Chicago Bulls, how many NBA Championships did he win?",
//         answerOptions: [
//             {
//                 answerText: '10',
//                 isCorrect: false
//             },
//             {
//                 answerText: '11',
//                 isCorrect: false
//             },
//             {   
//                 answerText: '6',
//                 isCorrect: false
//             },
//             {   
//                 answerText: '16',
//                 isCorrect: false
//             }
            
//         ]
        
        
//     },
//     {
//         questionText: "Which Williams sister has won more Grand Slam titles?",
//         answerOptions: [
//             {
//                 answerText: 'Serena',
//                 isCorrect: false
//             },
//             {
//                 answerText: 'Quan',
//                 isCorrect: false
//             },
//             {   
//                 answerText: 'Minh',
//                 isCorrect: false
//             },
//             {   
//                 answerText: 'Hoang',
//                 isCorrect: false
//             }
            
//         ]
        
        
//     },
//     {
//         questionText: "What country won the very first FIFA World Cup in 1930?",
//         answerOptions: [
//             {
//                 answerText: 'Uruguay',
//                 isCorrect: true
//             },
//             {
//                 answerText: 'America',
//                 isCorrect: false
//             },
//             {   
//                 answerText: 'France',
//                 isCorrect: false
//             },
//             {   
//                 answerText: 'Vietnam',
//                 isCorrect: false
//             }
            
//         ]
        
        
//     }
// ]
// data.forEach((item, index) => {
//     firestore.collection('test-02').doc(`question-${index+1}`).set(item)
//     .then(() =>console.log("done"));
    
// });


// const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   auth.signInWithPopup(provider);
// };

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async uid => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();

//     return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };