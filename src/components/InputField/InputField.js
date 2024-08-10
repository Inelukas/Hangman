import { useState } from "react";
import styled from "styled-components";

const StyledInputField = styled.div`
  background: var(--side-color);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 20px;
  padding: 5px;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    button {
      padding: 5px;
      background: white;
      border: none;
      border-radius: 10px;
    }
  }
`;

export function InputField({ currentWord, onUpdate, onMiss }) {
  const [letter, setLetter] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);

  function handleInput(event) {
    if (letter?.length < 1 || letter === undefined) {
      setLetter(event.target.value?.toUpperCase());
    } else {
      setLetter(event.target.value[1]?.toUpperCase());
    }
  }

  function handleGuess(event) {
    event.preventDefault();
    if (currentWord.includes(letter?.toLowerCase())) {
      onUpdate(letter.toLowerCase());
    } else {
      onMiss();
      if (!wrongLetters.includes(letter)) {
        setWrongLetters([...wrongLetters, letter]);
      }
    }
    setLetter("");
    event.target.input.focus();
  }

  return (
    <StyledInputField>
      <form onSubmit={handleGuess}>
        <input name="input" onChange={handleInput} value={letter} />
        {wrongLetters.length > 0 ? (
          <p>Wrong Letters: {wrongLetters.map((letter) => letter + ", ")}</p>
        ) : null}
        <button type="submit">Confirm</button>
      </form>
    </StyledInputField>
  );
}
