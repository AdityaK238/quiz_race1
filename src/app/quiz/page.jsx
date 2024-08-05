// pages/quizzes.js

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedUserRoute from '../(components)/ProtectedRoutes/ProtectedUserRoutes'
import styles from './quizzes.module.css';
import { UserAuth } from '@/lib/firebase/authContext';
import { joinQuiz } from '@/lib/firebase/database'

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    fetch('/api/getAvailableQuizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  const startQuiz = (id) => {
    joinQuiz(id, user.uid, user.email)
    router.push(`/quiz/${id}`);
  };

  return (
    <ProtectedUserRoute>
    <div className={styles.container}>
      <h1>Available Quizzes</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.q_id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>
                <button onClick={() => startQuiz(quiz.q_id)} className={styles.button}>
                  Start Quiz
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ProtectedUserRoute>
  );
};

export default Quizzes;
