import React from 'react'

const QuestionTrack = ({style, jumpToQuestionX, number}) => {
    return (
       
        <p onClick={jumpToQuestionX} className={`cursor-pointer ${style}`}>{`Question Number ${number}`} </p>
        
        
    )
}

export default QuestionTrack
