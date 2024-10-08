import styled from "styled-components";

const StyledHangman = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  transform: scale(1.5);

  div {
    position: absolute;
    background: black;
  }

  .gallow-bottom {
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 2px;
  }
  .gallow-stake-vertical {
    bottom: 10px;
    left: 35px;
    width: 2px;
    height: 150px;
  }
  .gallow-stake-horizontal {
    bottom: 160px;
    left: 35px;
    width: 100px;
    height: 2px;
  }

  .gallow-stake-diagonal {
    bottom: 127px;
    left: 50px;
    width: 2px;
    height: 40px;
    transform: rotate(45deg);
  }

  .gallow-hanging-part {
    bottom: 122px;
    left: 135px;
    width: 2px;
    height: 40px;
  }

  .hangman-head {
    bottom: 100px;
    left: 123px;
    width: 25px;
    height: 25px;
    border-radius: 100px;
    background: #ffeead;
  }

  .hangman-body {
    bottom: 60px;
    left: 135px;
    width: 2px;
    height: 40px;
    background: #ffeead;
  }

  .hangman-left-leg {
    bottom: 35px;
    left: 124px;
    width: 2px;
    height: 30px;
    transform: rotate(45deg);
    background: #ffeead;
  }
  .hangman-right-leg {
    bottom: 35px;
    left: 146px;
    width: 2px;
    height: 30px;
    transform: rotate(135deg);
    background: #ffeead;
  }
  .hangman-left-arm {
    bottom: 75px;
    left: 125px;
    width: 2px;
    height: 25px;
    transform: rotate(135deg);
    background: #ffeead;
  }
  .hangman--right-arm {
    bottom: 75px;
    left: 145px;
    width: 2px;
    height: 25px;
    transform: rotate(45deg);
    background: #ffeead;
  }

  .face {
    background: none;
    position: absolute;
    left: -7px;
    top: -15px;
    z-index: 2;
  }
`;

export function Hangman({ missCount, gameWon }) {
  return (
    <StyledHangman>
      <div className="gallow-bottom" />
      {missCount > 0 && <div className="gallow-stake-vertical" />}
      {missCount > 1 && <div className="gallow-stake-horizontal" />}
      {missCount > 2 && <div className="gallow-stake-diagonal" />}
      {missCount > 3 && <div className="gallow-hanging-part" />}
      {(missCount > 4 || gameWon) && (
        <div className="hangman-head">
          <div className="face">
            {gameWon && "😇"}
            {!gameWon && missCount <= 7 && "😞"}
            {!gameWon && missCount > 7 && missCount <= 9 && "😨"}
            {!gameWon && missCount > 9 && "😫"}
          </div>
        </div>
      )}
      {missCount > 5 && <div className="hangman-body" />}
      {missCount > 6 && <div className="hangman-left-leg" />}
      {missCount > 7 && <div className="hangman-right-leg" />}
      {missCount > 8 && <div className="hangman-left-arm" />}
      {missCount > 9 && <div className="hangman--right-arm" />}
    </StyledHangman>
  );
}
