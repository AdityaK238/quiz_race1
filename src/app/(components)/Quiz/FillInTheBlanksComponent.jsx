// BlankComponent.js
import React from 'react';
import styles from './FillInTheBlanksComponent.module.css';

const BlankComponent = ({ question, answer, onChange }) => {
  return (
    <div className={styles.blankComponent}>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default BlankComponent;
