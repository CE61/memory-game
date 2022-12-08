import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Deck from "./components/Deck";

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore"))
  );
  const [cardArray, setCardArray] = useState(generateNewCards());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const isNewBestScore = !bestScore || bestScore < score;

  useEffect(() => {
    console.log("Cards shuffled!");
    // Insert new cards when all cards are clicked
    score < 25 && cardArray.every((card) => card.isClicked) && insertNewCards();
    // Remove all cards and generate new ones when gameOver
    if (gameOver) {
      const newCards = generateNewCards();
      setCardArray((oldArray) => newCards);
      setGameOver(false);
    }
    if(score===25){
      setBestScore(score);
      localStorage.setItem("bestScore", JSON.stringify(score));
      setCardArray();
      setGameWon(true);
    }
  }, [score]);

  function generateNewCards() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newArray = [];
    if (score === 0) {
      // Generate rgb array [num,num,num] => rgb(255,255,255)
      for (let i = 0; i < 5; i++) {
        newArray.push({
          rgbColor: [
            Math.floor(Math.random() * 255 + 1),
            Math.floor(Math.random() * 255 + 1),
            Math.floor(Math.random() * 255 + 1),
          ],
          isClicked: false,
          id: i,
          rune: alphabet[i]
        });
      }
    } else if(score<25){
      for (let i = score; i < score + 5; i++) {
        newArray.push({
          // Generate rgb array [num,num,num] => rgb(255,255,255)
          rgbColor: [
            Math.floor(Math.random() * 255 + 1),
            Math.floor(Math.random() * 255 + 1),
            Math.floor(Math.random() * 255 + 1),
          ],
          isClicked: false,
          id: i,
          rune: alphabet[i]
        });
      }
    }
    return newArray;
  }
  function insertNewCards() {
    const newCards = generateNewCards();
    setCardArray((oldArray) => oldArray.concat(newCards));
  }
  function handleClick(id, isClicked) {
    if (!isClicked) {
      const numPositionArray = [];

      // Setting up the random number array (numPositionArray)
      for (let i = 0; i < cardArray.length; i++) {
        let randomNum = Math.floor(Math.random() * cardArray.length);
        numPositionArray.every((num) => num !== randomNum)
          ? numPositionArray.push(randomNum)
          : (i -= 1);
      }
      console.log(numPositionArray);

      setCardArray((oldArray) => {
        const newArray = [];
        // Inputting new values positioned accordingly to numPositionArray
        for (let i = 0; i < oldArray.length; i++) {
          oldArray[i].id === id
            ? (newArray[numPositionArray[i]] = {
                ...oldArray[i],
                isClicked: true,
              })
            : (newArray[numPositionArray[i]] = oldArray[i]);
        }
        // Return shuffled new array with clicked object
        return newArray;
      });
      setScore((prevScore) => prevScore + 1);
    } else {
      if (isNewBestScore) {
        setBestScore(score);
        localStorage.setItem("bestScore", JSON.stringify(score));
      }
      setScore(0);
      setGameOver(true);
    }
  }

  function resetGame(){
    setScore(0)
    setGameWon(false)
    setCardArray(generateNewCards());
    console.log("Game reset!");
  }
  console.log(cardArray);

  return (
    <div className="app-container">
      <Header />
      <div className="main">
        {bestScore && <p>Best Score: {bestScore}</p>}
        <p>Score: {score}</p>
        {!gameWon && <Deck cardArray={cardArray} handleClick={handleClick} />}
        {gameWon && <h1>YOU WIN!</h1>}
        {gameWon && <button onClick={()=>resetGame()}>Click here to reset game</button>}
        {score === 0 && <p className="instructions">Click on the runes to get points added to your score,
           but don't click any runes you've clicked on before.</p>}
      </div>
    </div>
  );
}
