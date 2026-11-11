import Square from './Square';

export default function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((sq, index) => (
        <Square
          key={index}
          value={sq}
          onSquareClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index)}
        />
      ))}
    </div>
  );
}