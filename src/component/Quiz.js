import React, { useState, useEffect } from 'react';
import './Quiz.css';
import {auth} from '../firebase';

export default function App({data}) {
	const dataQuery = data;
	console.log(dataQuery);
	const INITIAL_TIME =  {
		initialMiniute: 0,
		initialSecond: 20 
	}
	// Hard-coded question templates.
	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},    
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];
	

	// Keep track of the current question
	const [currentQuestion, setCurrentQuestion] = useState(0);
  
	// Keep track of time. 
	const [seconds, setSeconds] = useState(INITIAL_TIME.initialSecond); 
	const [minutes, setMinutes] = useState(INITIAL_TIME.initialMiniute);
	
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
	
	// Save scrore concurrently.
	const [score, setScore] = useState(0);
  
  // Validate ans with predefined templates.
  const checkAnswer = (ans) => {
    const found = questions[currentQuestion].answerOptions.find(answer => answer.answerText === ans);
    console.log(found.isCorrect);

    return found.isCorrect;
  }

  // Handle select option event.
  const selectAnswer = (e) => {
    e.preventDefault();

    if (checkAnswer(e.target.innerText)) {
      setScore(score => score + 1);
    }
    setCurrentQuestion(currentQuestion => currentQuestion + 1);  
    
  }


	return (
	<>
	<div className="mb-4">
		<span className="w-16 h-16 p-2 mr-2 rounded-md bg-red-400 font-bold">{minutes}</span>
		<span className="font-bold">:</span>
		<span className="w-16 h-16 p-2 ml-2 rounded-md bg-red-400 font-bold">{seconds}</span>
	</div>

	{data.length && <div className='app'>
			
			{currentQuestion  >= questions.length ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{data[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{
              questions[currentQuestion].answerOptions.map(answer => (
                <button key={answer.answerText} onClick={e => selectAnswer(e)} >{answer.answerText}</button>
              )
                  )
            }
					</div>
				</>
			)}

			

		</div>}
	
		
	{/* Handle submit here. Click Submit -> Save ans+questions along with user to firestore */}
	<button className='mt-8 sign-out-btn'>Submit</button>
		
	{/* Sign Out Button */}
	<button className='mt-2' onClick={
		e => {auth.signOut()
			.then(() => {
				alert('You have been signed out!');
		});}}>Sign Out</button>
	
		</>
		

		

	);
}