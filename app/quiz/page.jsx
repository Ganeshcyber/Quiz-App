
'use client'

import React, { useState, useEffect } from 'react';
import { quiz } from '../data.js';

const Page = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,  
  });

  const [timer, setTimer] = useState(150); // timer in the seconds (2:30)mins
  
  const { questions } = quiz;
  const { question, options, correctAnswer } = questions[activeQuestion];


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          handleQuizSubmit(); 
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []); 
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const handleQuizSubmit = () => {
    setShowResult(true);
  };

  return (
    <div className='container'>
      <h1>Quiz Page</h1>
      <br/><br/>
      <div style={{display: " flex" , justifyContent: "space-between"}}>
      <h2>Welcome , <span style={{ color: 'yellow' }}>{name}</span> !</h2>

        
        
        <div style={{color: " white"}}>
        <p style={{fontSize: "25px"}}>Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>
      </div>
        
      </div>
      <div><h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2></div>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <h3>{question}</h3>
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(option, idx)}
                className={
                  selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                }
              >
                <span>{option}</span>
              </li>
            ))}
            <button onClick={nextQuestion} disabled={!checked} className='btn'>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Results</h3>
            <h3>Overall {(result.score / (questions.length * 5)) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Page;
