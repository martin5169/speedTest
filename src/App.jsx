import { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

const colors = ["red", "white", "green", "blue", "yellow", "purple"];

const Square = ({ children, color }) => {
  return (
    <div className="square color" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

function App() {
  const dispatch = useDispatch();

  const [highestScores, setHighestScores] = useState(() => {
    const storedHighestScore = JSON.parse(localStorage.getItem("points"));
    return storedHighestScore || [];
  });

  const [gameFinished, setGameFinished] = useState(false);
  const [time, setTime] = useState(10);
  const [points, setPoints] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [color, setColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const handleSelection = () => {
    setStartGame(true);
  };

  const generateColor = (selected) => {
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomColorIndex];

    if (color === selected) {
      setPoints((prevPoints) => prevPoints + 1);
      setColor(randomColor);
    } else {
      setPoints((prevPoints) => prevPoints - 1);
    }
  };

  const handleGameFinish = () => {
    updateHighestScores();
    saveGameResults();
    resetGame();
  };

  const updateHighestScores = () => {
    const updatedScores = [...highestScores, points].sort((a, b) => b - a);
    const topThreeScores = updatedScores.slice(0, 3);
    setHighestScores(topThreeScores);
    dispatch({ type: "SET_HIGHEST_SCORE", payload: topThreeScores });
  };

  const saveGameResults = () => {
    localStorage.setItem("points", JSON.stringify(highestScores));
  };

  const resetGame = () => {
    setStartGame(false);
    setPoints(0);
    setTime(10);
    setGameFinished(false);
  };

  useEffect(() => {
    if (startGame) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        setGameFinished(true);
      }, 10000);
    }
  }, [startGame]);

  useEffect(() => {
    const storedHighestScore = JSON.parse(localStorage.getItem("points"));
    if (storedHighestScore !== null) {
      setHighestScores(storedHighestScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(highestScores));
  }, [highestScores]);

  return (
    <main className="board">
      <h1>Speed challenge</h1>
      <div className="conteiner">
        <aside className="counter">
          <div className="logo">
            <h2>{time} seconds</h2>
            <h2>Points: {points}</h2>
            <div className="scoreList">
              <h3>Top Scores</h3>
              <div>
                {highestScores.map((score, index) => (
                  <li key={index}>
                    {index + 1}° place - {score} points{" "}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="turn">
          <div className="colorChance">
            <Square color={color}>{color.toUpperCase()}</Square>
          </div>
          <div>
            {colors.map((c, index) => (
              <button
                style={{ backgroundColor: c }}
                key={index}
                onClick={() => generateColor(c)}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {!startGame && (
          <section className="winner">
            <div className="text">
              <h2>Press the button </h2>
              <footer>
                <button onClick={handleSelection}>START</button>
              </footer>
            </div>
          </section>
        )}

        {gameFinished && (
          <section className="winner">
            <div className="text">
              <h2>FINISH</h2>
              <p>POINTS: {points}</p>
              <footer>
                <button onClick={handleGameFinish}>CLOSE</button>
              </footer>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
