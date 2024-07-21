import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import cross from '/cross.png';
import circle from '/circle.png';

let data = ["", "", "", "", "", "", "", "", ""];
const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef();

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${circle} alt="circle" />`;
      data[num] = "o";
    } else {
      e.target.innerHTML = `<img src=${cross} alt="cross" />`;
      data[num] = "x";
    }
    setCount(count + 1);
    checkWin();
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "o") {
      titleRef.current.innerHTML = `<img src=${circle} alt="circle" /> Circle Won`;
    } else if (winner === "x") {
      titleRef.current.innerHTML = `<img src=${cross} alt="cross" /> Cross Won`;
    } else {
      titleRef.current.innerHTML = "Draw";
    }
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    if (data.every(cell => cell !== "")) {
      won("draw");
    }
  };

  const reset = () => {
    setCount(0);
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "Tic Tac Toe";
    document.querySelectorAll(".boxes").forEach(box => (box.innerHTML = ""));
  };

  return (
    <div className='container'>
      <div className='title'>
        <h1 ref={titleRef}>Tic Tac Toe in <span>React</span></h1>
      </div>
      <div className='board'>
        <div className="rowA">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="rowB">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="rowC">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
