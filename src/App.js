import React, {useState } from 'react';
import './App.css';

function Square({value,onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}


export default function Game(){
    const [history,setHistory]=useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0);
    const [xIsNext, setXIsNext]=useState(true);
    const currentSquares = history[currentMove];
    const winner = calculateWinner(currentSquares);
    let status;
    if (winner)
      status = 'Winner: ' + winner;
    else if(currentMove===9)
      status='draw';
    else 
      status = 'Next turn: ' + (xIsNext ? 'X' : 'O');

    function HandlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setXIsNext(!xIsNext);
    }
    function jumpTo(nextMove){
      setCurrentMove(nextMove);
      setXIsNext(nextMove%2===0);
    }
    function PlayAgain(){
      const nextHistory=[...history.slice(0,1)];
      setHistory(nextHistory);
      setXIsNext(true);
      setCurrentMove(0);
    }
    const moves=history.map((squares,move)=>{
        let description;
        if(move>0)
          description ='Go to move : '+move;
        else
          description='Go to start';

        return(
          <li key={move}>
            <button onClick={()=>jumpTo(move)}>{description.toUpperCase()}</button>
          </li>
        )
    })
    return (<div className='game'>
        <div className={(winner||currentMove===9?'result':'status')}>
            <span>{status.toUpperCase()}</span>
            <button className={(winner||currentMove===9?'playAgain':'notPlayAgain')} onClick={()=>PlayAgain()}>Play Again</button>
        </div>
        <div className='boardHistory'>
          <div className='board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={HandlePlay}></Board>
          </div>
          <div className='goto'>
            <ul>{moves}</ul>
          </div>
        </div>
      </div>);
}


function Board({xIsNext,squares,onPlay}){
  function HandleClick(i){
    if(squares[i]||calculateWinner(squares))
      return;
    const next =squares.slice();
    if(xIsNext)
      next[i]='X';
    else
      next[i]='O';
    onPlay(next);
  }

  return (<div>
    <div className='box-row'>
      <Square value={squares[0]} onSquareClick={()=>HandleClick(0)}></Square>
      <Square value={squares[1]} onSquareClick={()=>HandleClick(1)}></Square>
      <Square value={squares[2]} onSquareClick={()=>HandleClick(2)}></Square>
    </div>
    <div className='box-row'>
      <Square value={squares[3]} onSquareClick={()=>HandleClick(3)}></Square>
      <Square value={squares[4]} onSquareClick={()=>HandleClick(4)}></Square>
      <Square value={squares[5]} onSquareClick={()=>HandleClick(5)}></Square>
    </div>
    <div className='box-row'>
      <Square value={squares[6]} onSquareClick={()=>HandleClick(6)}></Square>
      <Square value={squares[7]} onSquareClick={()=>HandleClick(7)}></Square>
      <Square value={squares[8]} onSquareClick={()=>HandleClick(8)}></Square>
    </div>
  </div>);
}
function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])
      return squares[a];
  }
  return null;
}
