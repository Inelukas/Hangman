import { useEffect, useState } from "react";
import { Hangman } from "../Hangman/Hangman";
import { InputField } from "../InputField/InputField";

import styled from "styled-components";

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20vh;
  font-size: 40px;

  .main-part {
    display: flex;
    gap: 10vw;
  }

  .game-end {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    button {
      padding: 10px;
      border-radius: 10px;
      background: #ffeead;
    }
  }
`;

export function Game() {
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [missCount, setMissCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  let hasFetched = false;

  async function fetchWord() {
    if (hasFetched) return;
    hasFetched = true;
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1"
    );
    const wordArray = await response.json();
    const word = wordArray[0].toLowerCase();
    setCurrentWord(word);
  }

  useEffect(() => {
    fetchWord();
  }, []);

  function updateWord(letter) {
    setGuessedLetters([...guessedLetters, letter]);
  }

  function handleMiss() {
    setMissCount(missCount + 1);
  }

  function handleNewGame() {
    setGuessedLetters([]);
    setMissCount(0);
    setGameWon(false);
    fetchWord();
  }

  useEffect(() => {
    if (
      currentWord &&
      currentWord.split("").every((letter) => guessedLetters.includes(letter))
    ) {
      setGameWon(true);
    }
  }, [guessedLetters, currentWord]);

  return (
    <StyledGame>
      <div className="main-part">
        <>
          {gameWon ? (
            <div className="game-end">
              <h1>Congratulations!</h1>
              <button onClick={handleNewGame}>Play again</button>
            </div>
          ) : !gameWon && missCount <= 9 ? (
            <InputField
              currentWord={currentWord}
              onUpdate={updateWord}
              onMiss={handleMiss}
            />
          ) : (
            <div className="game-end">
              <h1>Game Over!</h1>
              <button onClick={handleNewGame}>Play again</button>
            </div>
          )}
        </>
        <Hangman missCount={missCount} gameWon={gameWon} />
      </div>
      <div>
        {currentWord.split("").map((letter, index) => {
          return guessedLetters.includes(letter) || missCount === 10
            ? index === 0
              ? letter.toUpperCase()
              : letter
            : " _ ";
        })}
      </div>
    </StyledGame>
  );
}
