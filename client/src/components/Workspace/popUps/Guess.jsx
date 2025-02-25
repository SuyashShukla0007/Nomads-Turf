


import React, { useEffect, useState } from 'react';

function Guess() {
  const [popUp, setPopUp] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [hints, setHints] = useState([]);
  const [guess, setGuess] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [usedWords, setUsedWords] = useState(new Set());

  const words=[
    {
      "word": "Algorithm",
      "hints": [
        "A sequence of steps",
        "Used in programming and data processing",
        "Can be optimized for better performance"
      ]
    },
    {
      "word": "Blockchain",
      "hints": [
        "A chain of digital records",
        "Used in cryptocurrencies like Bitcoin",
        "Ensures secure and transparent transactions"
      ]
    },
    {
      "word": "Cache",
      "hints": [
        "Temporary storage",
        "Used to improve system performance",
        "Can be cleared to free up space"
      ]
    },
    {
      "word": "Debugging",
      "hints": [
        "A process in software development",
        "The process of finding and fixing errors in code",
        "Can be done using breakpoints and logs"
      ]
    },
    {
      "word": "Encryption",
      "hints": [
        "A security technique",
        "Used in cybersecurity and communication",
        "Requires a key to decrypt the information"
      ]
    },
    {
      "word": "Framework",
      "hints": [
        "A structure for development",
        "Examples include React, Django, and Spring Boot",
        "Helps developers work efficiently"
      ]
    },
    {
      "word": "Git",
      "hints": [
        "A tool for collaboration",
        "Used to track changes in code",
        "Works with repositories like GitHub and GitLab"
      ]
    },
    {
      "word": "API",
      "hints": [
        "A way for software to communicate",
        "Can be RESTful or GraphQL-based",
        "Used to fetch or send data from a server"
      ]
    },
    {
      "word": "Cloud",
      "hints": [
        "A remote technology",
        "Popular providers include AWS, Google Cloud, and Azure",
        "Enables scalable and on-demand resources"
      ]
    },
    {
      "word": "Compiler",
      "hints": [
        "A translator for code",
        "Used in languages like C, Java, and Go",
        "Helps execute programs efficiently"
      ]
    },
    {
      "word": "Database",
      "hints": [
        "Stores information",
        "Can be relational or non-relational",
        "Examples include MySQL, PostgreSQL, and MongoDB"
      ]
    },
    {
      "word": "Frontend",
      "hints": [
        "A part of web development",
        "Involves designing user interfaces",
        "Uses HTML, CSS, and JavaScript"
      ]
    },
    {
      "word": "Backend",
      "hints": [
        "Handles logic and data",
        "Runs on a server",
        "Uses languages like Node.js, Python, and Java"
      ]
    },
    {
      "word": "Virtualization",
      "hints": [
        "Creates a simulated environment",
        "Used in cloud computing",
        "Examples include VMware and Docker"
      ]
    },
    {
      "word": "Cybersecurity",
      "hints": [
        "Protects digital systems",
        "Involves firewalls and encryption",
        "Prevents hacking and cyber attacks"
      ]
    },
    {
      "word": "Artificial Intelligence",
      "hints": [
        "Mimics human intelligence",
        "Used in automation and decision-making",
        "Includes machine learning and deep learning"
      ]
    },
    {
      "word": "Data Science",
      "hints": [
        "Extracts insights from information",
        "Uses statistics and machine learning",
        "Involves Python, R, and SQL"
      ]
    },
    {
      "word": "Router",
      "hints": [
        "A network device",
        "Forwards data packets",
        "Connects different networks"
      ]
    },
    {
      "word": "Machine Learning",
      "hints": [
        "A branch of AI",
        "Uses algorithms to improve automatically",
        "Common libraries include TensorFlow and Scikit-Learn"
      ]
    },
    {
      "word": "Phishing",
      "hints": [
        "A cyber attack method",
        "Tricks users into revealing sensitive information",
        "Often done through fraudulent emails and websites"
      ]
    }
  ]
  
 
  
    const getNextWord = () => {
      let availableWords = words.filter(w => !usedWords.has(w.word));
      if (availableWords.length === 0) {
        setUsedWords(new Set());
        availableWords = [...words];
      }
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setUsedWords(prev => new Set(prev).add(randomWord.word));
      setRandomWord(randomWord.word);
      setHints(randomWord.hints);
      setHintIndex(0);
      setAttempts(0);
      setMessage('');
      setGuess('');
    };
  
    useEffect(() => {
      getNextWord();
    }, [popUp]);
  
    const checkWord = () => {
      if (guess.toLowerCase() === randomWord.toLowerCase()) {
        setMessage('✅ Correct! Moving to next word...');
        setTimeout(() => getNextWord(), 1000);
      } else {
        setAttempts(attempts + 1);
        if (attempts >= 2) {
          setMessage(`❌ The correct word was: ${randomWord}`);
        } else {
          setHintIndex(hintIndex + 1);
          setMessage('❌ Try again!');
        }
      }
      setGuess('');
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        {popUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popUpContent w-96 p-6 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2 text-blue-400">Guess Game</h2>
              <p className="mb-4 text-gray-300">Guess the word based on hints!</p>
              <div className="w-full p-4 bg-gray-700 rounded-lg mb-3">
                {hints.slice(0, hintIndex + 1).map((hint, index) => (
                  <p key={index} className="text-sm text-gray-200">🔹 {hint}</p>
                ))}
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded mt-3 bg-gray-900 text-white border-gray-600"
                placeholder="Enter your guess..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={checkWord}
              >
                Submit
              </button>
              {message && <p className="mt-4 font-bold text-lg">{message}</p>}
              <div className="flex gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={getNextWord}
                >
                  Next Question
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={() => setPopUp(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {!popUp && (
          <button className="h-32 w-32 bg-blue-500 text-white rounded-lg shadow-lg text-xl font-bold hover:bg-blue-600 transition" onClick={() => setPopUp(true)}>
            Play Game
          </button>
        )}
      </div>
    );
  }
  
  export default Guess;
  