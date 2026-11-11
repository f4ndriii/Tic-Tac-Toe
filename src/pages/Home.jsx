import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [playerX, setPlayerX] = useState('Pemain X');
  const [playerO, setPlayerO] = useState('Pemain O');
  const navigate = useNavigate();

  function handleStartGame(e) {
    e.preventDefault();
    // Kirim data nama ke halaman /game via state navigator
    navigate('/game', { state: { playerX, playerO } });
  }

  return (
    <div className="game-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>
      <form className="game-center home-card" onSubmit={handleStartGame}>
        <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Masukan Nama Pemain</h2>
        
        <div style={{ width: '100%' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Pemain X (Merah)
          </label>
          <input
            type="text"
            className="player-name-input"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            required
          />
        </div>

        <div style={{ width: '100%' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Pemain O (Hijau)
          </label>
          <input
            type="text"
            className="player-name-input"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn reset">Mulai Permainan 🚀</button>
      </form>
    </div>
  );
}