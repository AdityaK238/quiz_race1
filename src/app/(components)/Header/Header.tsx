"use client";
import Link from 'next/link';
import styles from '@/app/(components)/Header/Header.module.css';
import { UserAuth } from '@/lib/firebase/authContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Header: React.FC = () => {
  const { user, admin } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleMakeAdmin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/setAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        router.push('/')
      } else {
        setMessage(data.error);
      }
    } catch (err : any) {
      setMessage('An error occurred: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        {admin ? (
          <ul>
            <li>
              <Link href="/admin">Home</Link>
            </li>
            <li>
              <Link href="/quiz/create">Create Quiz</Link>
            </li>
            <li>
              <Link href="/quiz/start">Start Quiz</Link>
            </li>
            <li>
              <Link href="/logout" id="logout-id">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/quiz" id="quiz-id">Quiz</Link>
            </li>
            <li>
              <Link href="/leaderboard" id="leaderboard-id">Leaderboard</Link>
            </li>
            <li>
              {user ? (
                <Link href="/logout" id="logout-id">Logout</Link>
              ) : (
                <Link href="/login" id="login-id">Login</Link>
              )}
            </li>
            {user && (
              <li>
                <button onClick={handleMakeAdmin} disabled={loading}>
                  {loading ? 'Processing...' : 'Become Admin'}
                </button>
                {message && <p>{message}</p>}
              </li>
            )}
          </ul>
        )}
      </nav>
      <div className="logo">
        <h1>Quiz Race</h1>
      </div>
    </div>
  );
};

export default Header;
