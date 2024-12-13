'use client'

import { useState, useEffect } from 'react';
import { loadQuestions, Question as QuestionType } from '../utils/loadQuestions';
import { Question } from '../components/Question';
import { Statistics } from '../components/Statistics';
import { Timer } from '../components/Timer';
import { CompletionCard } from '../components/CompletionCard';
import { Button } from "@/components/ui/button"

export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isNewQuestion, setIsNewQuestion] = useState(true);
  const [timerRunning, setTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState('00:00');
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);

  useEffect(() => {
    loadQuestions().then(loadedQuestions => {
      setQuestions(loadedQuestions.sort(() => Math.random() - 0.5));
    });
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setTotalAnswered(prev => prev + 1);
    setCurrentQuestionAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsNewQuestion(true);
      setCurrentQuestionAnswered(false);
    } else {
      setQuizCompleted(true);
      setTimerRunning(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setQuizCompleted(false);
    setIsNewQuestion(true);
    setTimerRunning(true);
    setCurrentQuestionAnswered(false);
    setQuestions(questions => questions.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    setIsNewQuestion(false);
  }, [currentQuestionIndex]);

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Quiz System</h1>
        <Statistics correct={score} total={totalAnswered} />
        <Timer isRunning={timerRunning} />
      </div>
      {!quizCompleted ? (
        <>
          <Question 
            question={questions[currentQuestionIndex]} 
            onAnswer={handleAnswer}
            isNewQuestion={isNewQuestion}
          />
          <div className="flex justify-between items-center mt-8">
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <Button onClick={nextQuestion} disabled={!currentQuestionAnswered}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </>
      ) : (
        <CompletionCard score={score} total={questions.length} time={finalTime} />
      )}
    </div>
  );
}

