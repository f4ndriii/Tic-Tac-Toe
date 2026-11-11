import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Board from '../Board';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil nama pemain dari state routing (default jika di-refresh langsung)
  const playerX = location.state?.playerX || 'Pemain X';
  const playerO = location.state?.playerO || 'Pemain O';

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  function calculateWinner(sqs) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]) {
        return { winner: sqs[a], line: [a, b, c] };
      }
    }
    return null;
  }

  const winInfo = calculateWinner(squares);
  const winner = winInfo?.winner;
  const isDraw = !winner && squares.every((sq) => sq !== null);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const newWinInfo = calculateWinner(nextSquares);
    if (newWinInfo) {
      setScores((prev) => ({ ...prev, [newWinInfo.winner]: prev[newWinInfo.winner] + 1 }));
    } else if (nextSquares.every((sq) => sq !== null)) {
      setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Pemenang: ${winner === 'X' ? playerX : playerO} 🎉`;
  } else if (isDraw) {
    status = 'Pertandingan Seri! 🤝';
  } else {
    status = `Giliran: ${xIsNext ? playerX : playerO}`;
  }

  return (
    <div className="game-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>

      <div className="game-main">
        {/* Card X - Nama Pemain Read-Only */}
        <div className={`player-card ${xIsNext && !winner && !isDraw ? 'active' : ''}`}>
          <span className="player-symbol x">X</span>
          <span className="player-name-text">{playerX}</span>
          <div className="player-score">Skor: <strong>{scores.X}</strong></div>
        </div>

        {/* Board Center */}
        <div className="game-center">
          <div className="status">{status}</div>
          <Board squares={squares} onSquareClick={handleClick} winningLine={winInfo?.line} />
          <div className="center-footer">
            <div className="ties-info">Seri: <strong>{scores.ties}</strong></div>
            <button className="btn reset" onClick={resetGame}>Ronde Baru</button>
            <button 
              className="btn reset" 
              style={{ background: '#64748b', marginTop: '4px' }} 
              onClick={() => navigate('/')}
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Card O - Nama Pemain Read-Only */}
        <div className={`player-card ${!xIsNext && !winner && !isDraw ? 'active' : ''}`}>
          <span className="player-symbol o">O</span>
          <span className="player-name-text">{playerO}</span>
          <div className="player-score">Skor: <strong>{scores.O}</strong></div>
        </div>
      </div>
    </div>
  );
}