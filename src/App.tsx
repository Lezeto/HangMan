// App.tsx

import React from 'react';
import './index.css';
import Hangman from './hangman'; // Ensure correct import path

const App: React.FC = () => {
  const randomWord = "EXAMPLE"; // Replace with your logic to get a random word

  return (
    <div className="app">
      <header className="header">
        <div className="title">Documentation Title</div>
        <div className="header-links">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">Link 4</a>
          <a href="#">Link 5</a>
        </div>
      </header>

      <div className="container">
        <nav className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Section 1</div>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
            <a href="#">Link 4</a>
            <a href="#">Link 5</a>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Section 2</div>
            <a href="#">Link 6</a>
            <a href="#">Link 7</a>
            <a href="#">Link 8</a>
            <a href="#">Link 9</a>
            <a href="#">Link 10</a>
          </div>
        </nav>

        <main className="main-content">
          {/* Use Hangman component with word and maxAttempts */}
          <Hangman word={randomWord} maxAttempts={6} />
        </main>
      </div>

      <footer className="footer">
        <div className="footer-title">Footer Title</div>
        <div className="footer-links">
          <a href="#">Footer Link 1</a>
          <a href="#">Footer Link 2</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
