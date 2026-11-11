export default function Square({ value, onSquareClick, isWinning }) {
  let colorClass = '';
  if (value === 'X') colorClass = 'square-x';
  if (value === 'O') colorClass = 'square-o';

  return (
    <button 
      className={`square ${colorClass} ${isWinning ? 'winning' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}