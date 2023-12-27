// hangman.tsx

import React, { useState, useEffect } from 'react';
import './Hangman.css'; // Import your CSS file for styling

interface HangmanProps {
  maxAttempts: number;
}

const Hangman: React.FC<HangmanProps> = ({ maxAttempts }) => {
  const [word, setWord] = useState<string>('');
  const [displayedWord, setDisplayedWord] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(maxAttempts);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    setWord(getRandomWord());
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialWord = getRandomWord();
    const initialWordState = initialWord.split('').map((letter) => (letter === ' ' ? ' ' : '_'));
    setWord(initialWord);
    setDisplayedWord(initialWordState);
    setGuessedLetters([]);
    setAttemptsLeft(maxAttempts);
    setIsGameOver(false);
  };
  

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const handleGuess = (letter: string) => {
    if (!isGameOver && !guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);

      if (!word.includes(letter)) {
        setAttemptsLeft(attemptsLeft - 1);
      }

      const newDisplayedWord = word
        .split('')
        .map((char, index) => (newGuessedLetters.includes(char) ? char : displayedWord[index]));

      setDisplayedWord(newDisplayedWord);

      checkGameOver(newDisplayedWord);
    }
  };

  const checkGameOver = (currentWord: string[]) => {
    const isWordGuessed = currentWord.join('') === word;
    const updatedAttemptsLeft = attemptsLeft - 1;
    const isOutOfAttempts = updatedAttemptsLeft === 0;

    if (isWordGuessed || isOutOfAttempts) {
      setIsGameOver(true);
    } else {
      setAttemptsLeft(updatedAttemptsLeft);
    }
  };

  const handlePlayAgain = () => {
    setWord(getRandomWord());
    initializeGame();
  };

  const handleRestart = () => {
    setWord(getRandomWord());
    setAttemptsLeft(maxAttempts);
    setGuessedLetters([]);
    setIsGameOver(false);
    initializeGame();
  };

  const renderWord = () => {
    return displayedWord.map((letter, index) => (
      <span key={index} className="letter">
        {letter}
      </span>
    ));
  };

  const renderAlphabetButtons = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return alphabet.split('').map((letter, index) => (
      <button
        key={index}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || isGameOver}
        className={`letter-button ${guessedLetters.includes(letter) ? 'disabled' : ''}`}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="hangman-game">
      <div className="word-display">{renderWord()}</div>
      <div className="attempts-left">Attempts Left: {attemptsLeft}</div>
      <div className="alphabet-buttons">{renderAlphabetButtons()}</div>
      {isGameOver && (
        <div className="game-over-message">
          {attemptsLeft === 0 ? 'Game Over! You ran out of attempts.' : 'Congratulations! You guessed the word.'}
          <button onClick={handlePlayAgain}>Play Again</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

// Example array with 50 words
const wordList = [
  'JAVASCRIPT',
  'REACT',
  'TYPESCRIPT',
  'HTML',
  'CSS',
  // Add more words as needed
];

export default Hangman;
