import React, { useState, useEffect, useContext } from 'react';
import './Quiz.css';
import {auth, firestore} from '../firebase';
import {UserContext} from '../providers/UserProvider';
import QuestionTrack from './QuestionTrack';

export default function App() {
	const {user, loginAttempt} = useContext(UserContext);
	const [data, setData] = useState([]);
	const INITIAL_TIME =  {
		initialMiniute: 0,
		initialSecond: 100 
	};
	useEffect(() => {
		firestore.collection(sessionStorage.getItem('quizCode')).get().then((querySnapshot) => {
         
              if (querySnapshot.docs.length) {
                let queryData = querySnapshot.docs.map(doc => doc.data());
                return queryData;                
              } else {
                
                console.log("No such document!");
              }

            }).then((queryData) => {
              setData([...queryData]);
            
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
	}, [])
	// Keep track of the concurrent question
	const [currentQuestion, setCurrentQuestion] = useState(0);
  
	// Keep track of time. 
	const [seconds, setSeconds] = useState(INITIAL_TIME.initialSecond); 
	const [minutes, setMinutes] = useState(INITIAL_TIME.initialMiniute);
	

	// Keep track of account's ans.
	const [dataSent, setDataSent] = useState([]);
	useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {

                    clearInterval(myInterval)
					auth.signOut()
			.then(() => {
				alert('Time out!');
		});
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
	
  

  // Handle select option event.
  const selectAnswer = (e) => {
    e.preventDefault();
	
	document.querySelector('.answer-selected') && document.querySelector('.answer-selected').classList.remove('answer-selected');
	e.target.classList.add('answer-selected');

    
     
    
  }
  const saveSelection = () => {
	let answerSelected = document.querySelector('.answer-selected');
	if (answerSelected){
		setDataSent(prevDataSent => {
		if (prevDataSent.find(({questionText}) => questionText === data[currentQuestion].questionText)){
			return prevDataSent.map(dataSent => (
				dataSent.questionText === data[currentQuestion].questionText ? 
				{...dataSent, answerSelected : answerSelected.innerText} :
				dataSent
			));
		}else{
			return [...prevDataSent, {questionText: data[currentQuestion].questionText, answerSelected: answerSelected.innerText}]
		}
		
		
		});
	}
  }

  const handleNext = (e) => {
	e.preventDefault();

	saveSelection();
	setCurrentQuestion( currentQuestion => currentQuestion +1);


	
	
  }


  const handlePrev = (e) => {
	  e.preventDefault();
	
	saveSelection();
	
	setCurrentQuestion(currentQuestion => currentQuestion - 1); 
  }


  //Handle submit button.
  const handleSubmit = (e, dataSent) => {
	e.preventDefault();
	 
	firestore.collection("users").doc(user).update({loginAttempt: loginAttempt+1,ans: dataSent, quizCode: sessionStorage.getItem('quizCode')}).then(() => {
    	console.log("Document successfully written!");}
	
	).catch((error) => {
    	console.error("Error writing document: ", error);
	});
  }

  useEffect(() => {
	  
		 window.addEventListener('beforeunload', (e) => {
			 const event = e || window.event;

			 event.preventDefault();
			 
			 event.returnValue = "Are you sure you want to log out?";
	
	  })
  
	  
	}, []);

	const jumpToQuestionX = (number) => {
		saveSelection();
		setCurrentQuestion(number);
	}

	return (
		data.length && <>
	
	<div className='w-full mb-12 grid gap-8 grid-cols-3 place-items-center'>
		{data.map((question, i) => {
			
			if (dataSent.find(ans => ans.questionText === question.questionText)){
				

				return (<QuestionTrack style='line-through text-gray-300' jumpToQuestionX={()=>jumpToQuestionX(i)} number={i+1}></QuestionTrack>)
			}else{
				return (<QuestionTrack style='text-gray-200 font-bold' jumpToQuestionX={()=>jumpToQuestionX(i)} number={i+1}></QuestionTrack>);
			}
		})}
		
	</div>
	
	<div className="mb-4">
		<span className="w-16 h-16 p-2 mr-2 rounded-md bg-red-400 font-bold">{minutes}</span>
		<span className="font-bold">:</span>
		<span className="w-16 h-16 p-2 ml-2 rounded-md bg-red-400 font-bold">{seconds}</span>
	</div>
	
	 <div className='app'>
			
			{currentQuestion  >= data.length ? (
				<div className='score-section'> 
					 Please submit your answers!
				</div>
				
				
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{data.length}
						</div>
						<div className='question-text'>{data[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>{
              			data[currentQuestion].answerOptions.map(answer => {
							  
							let isSelected = dataSent.find(({answerSelected, questionText}) => 
								
								 (answerSelected === answer.answerText ) && (data[currentQuestion].questionText === questionText));
							

							if (isSelected){
								
								return (

									<button className='answer-selected' key={answer.answerText} onClick={e => selectAnswer(e)} >{answer.answerText}</button>
								)
							}else{
								return (
									<button key={answer.answerText} onClick={e => selectAnswer(e)} >{answer.answerText}</button>
								)
							}
						
                		})}
					</div>
				</>
			)}

			

		</div>
	
	
	{currentQuestion === data.length ? (
	
	<button className='mt-8 sign-out-btn' onClick={(e) => handleSubmit(e, dataSent)} >Submit</button>
	) : (
	<div className='w-full flex gap-8 items-center'>
		<button className='mt-8 ' onClick={(e) => handlePrev(e)}>Prev</button>
		<button className='mt-8 ' onClick={(e) => handleNext(e)}>Next</button>
	</div>
		
	)}
	
		
	{/* Sign Out Button */}
	<button className='mt-2' onClick={
		e => {auth.signOut()
			.then(() => {
				alert('You have been signed out!');
		});}}>Sign Out</button>

		{console.log(dataSent)}
		</>
	
		
	
		

	);
}