// components/Scoreboard.js
import React from 'react';
import styles from './Scoreboard.module.css';

const Scoreboard = ({players}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Scoreboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Player</th>
            <th className={styles.th}>Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td className={styles.td}>{player.name}</td>
              <td className={styles.td}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
