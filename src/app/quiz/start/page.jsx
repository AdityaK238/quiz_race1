// pages/quizzes.js

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedUserRoute from '../../(components)/ProtectedRoutes/ProtectedUserRoutes'
import styles from '../quizzes.module.css';
import { startQuiz } from '../../../lib/firebase/database';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [updates, setUpdates] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/getAllQuizzes')
      .then((response) => response.json())
      .then((data) => {console.log(data); setQuizzes(data)})
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, [updates]);

  const startQuizEvent = async (id) => {
    try{
        await startQuiz(id);

        const res = fetch('/api/startQuiz', {
            method: "PUT",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({q_id: id})
        })

        const data = await res.json();
        console.log(data)
        setUpdates((prev) => prev+1);
    } catch (err) {
        console.error(err);
    }
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.q_id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>{quiz.RunningStatus.toString()}</td>
              <td>
                <button onClick={() => startQuizEvent(quiz.q_id)} className={styles.button}>
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
