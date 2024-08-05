// McqComponent.js
import React from 'react';
import styles from '@/app/(components)/Quiz/MCQComponent.module.css';

const MCQComponent = ({ question, options, onSelect }) => {
  return (
    <div className={styles.mcqComponent}>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="option"
            value={option}
            onChange={() => onSelect(option)}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MCQComponent;