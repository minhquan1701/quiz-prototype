import React, { useState } from 'react';
import './Quiz.css';
import {auth} from '../firebase'
export default function App() {

	// Hard-coded question templates.
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},    
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	// Keep track of the current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
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
	<div className='app'>
			{currentQuestion  >= questions.length ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
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

			

		</div>
		
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