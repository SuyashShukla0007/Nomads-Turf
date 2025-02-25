import { useState, useEffect } from "react";

const TicTacToe = () => {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);

    useEffect(() => {
      if (!isPlayerTurn && !winner) {
          setTimeout(() => {
              const aiMove = findBestMove(board);
              if (aiMove !== -1) {
                  const newBoard = [...board];
                  newBoard[aiMove] = "O";
                  setBoard(newBoard);
                  setIsPlayerTurn(true);
  
                  // ✅ Check for a winner after AI move
                  const result = checkWinner(newBoard);
                  if (result) {
                      setWinner(result.winner);
                      setWinningCells(result.line);
                  }
              }
          }, 500);
      }
  }, [isPlayerTurn, board, winner]);
  

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);
        setIsPlayerTurn(false);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result.winner);
            setWinningCells(result.line);
        }
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setIsPlayerTurn(true);
        setWinner(null);
        setWinningCells([]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>

            <div className="grid grid-cols-3 gap-2">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`w-24 h-24 flex items-center justify-center text-3xl font-bold border-2 border-gray-400 bg-gray-800 hover:bg-gray-700 transition-all 
                            ${winningCells.includes(index) ? "winning-cell" : ""}
                            ${winner && !winningCells.includes(index) ? "losing-cell" : ""}
                        `}
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            {winner && (
                <div className="fade-in mt-4 text-xl font-semibold">
                    {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
                </div>
            )}

            <button
                onClick={resetGame}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-all"
            >
                Restart
            </button>

            <style>
                {`
                .winning-cell {
                    animation: glow 1s infinite alternate;
                }
                
                @keyframes glow {
                    0% { background-color: #10b981; }
                    100% { background-color: #34d399; }
                }
                
                .losing-cell {
                    animation: shake 0.5s ease-in-out;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                }
                
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1s forwards;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

// 🧠 AI Logic (Minimax Algorithm)
const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = "O"; // AI move
            let score = minimax(board, 0, false);
            board[i] = null; // Undo move

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};

const minimax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result?.winner === "X") return -10 + depth;
    if (result?.winner === "O") return 10 - depth;
    if (result?.winner === "Draw") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

// ✅ Winner Check Function
const checkWinner = (board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],           // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: pattern }; // Winner & winning line
        }
    }
    return board.includes(null) ? null : { winner: "Draw", line: [] };
};

export default TicTacToe;
