"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MCQComponent from '@/app/(components)/Quiz/MCQComponent';
import BlankComponent from '@/app/(components)/Quiz/FillInTheBlanksComponent';
import Scoreboard from '@/app/(components)/Scoreboard/Scoreboard';
import { updateScore, getScoreboard } from '@/lib/firebase/database';
import styles from './QuizComponent.module.css';

const QuizComponent = ({ quizId, userId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerScore, setPlayerScore] = useState(0);
  const [scoreboardData, setScoreboardData] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!quizId) return;

    fetch(`/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  }, [quizId]);

  const currentQuestion = quiz?.Questions[currentQuestionIndex];

  const handleSelect = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log('Answers:', answers);
    console.log('Current Question:', currentQuestion);
    console.log('Current Question Index:', currentQuestionIndex);

    const playerAnswer = answers[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    console.log('Player Answer:', playerAnswer);
    console.log('Correct Answer:', correctAnswer);

    setQuestionsAnswered(questionsAnswered + 1);
    setTotalTimeTaken(totalTimeTaken + (30 - timeLeft));

    if (playerAnswer === correctAnswer) {
      console.log('Correct Answer! Adding 50 points.');
      setPlayerScore(playerScore + 50);
      setCorrectAnswers(correctAnswers + 1);
      updateScore(quizId, userId, playerScore);
    } else {
      console.log('Incorrect Answer. No points added.');
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    

    setShowLeaderboard(true);
  };

  const goToNextQuestion = () => {
    setShowLeaderboard(false);
    setTimeLeft(30);

    // Check if the quiz is completed
    if (currentQuestionIndex < quiz.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Quiz Completed!');
      // Post the results to the backend
      fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId,
          userId,
          playerScore,
          correctAnswers,
          incorrectAnswers,
          questionsAnswered,
          totalTimeTaken,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Results submitted:', data);
        router.push('/leaderboard');
      })
      .catch(error => {
        console.error('Error submitting results:', error);
      });
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'MCQ':
        return (
          <MCQComponent
            question={currentQuestion.question_text}
            options={currentQuestion.options.split(',')}
            onSelect={(answer) => handleSelect(currentQuestionIndex, answer)}
          />
        );
      case 'Blank':
        return (
          <BlankComponent
            question={currentQuestion.question_text}
            answer={answers[currentQuestionIndex] || ''}
            onChange={(e) => handleSelect(currentQuestionIndex, e.target.value)}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (showLeaderboard) {
    getScoreboard(quizId).then(data => setScoreboardData(data))
    console.log(scoreboardData)
    return (
      <div className={styles.leaderboardContainer}>
        <Scoreboard players={scoreboardData} />
        <button onClick={goToNextQuestion} className={styles.nextButton}>
          Next Question
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizComponent}>
      <div className={styles.timer}>Time left: {timeLeft} seconds</div>
      {renderQuestion()}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuizComponent;
