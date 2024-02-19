import { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

const colors = ["red", "white", "green", "blue", "yellow", "purple"];

const Square = ({ children, isSelected, color }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  return (
    <div className={className} style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const highestScore = useSelector((state) => state.points);
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

  const handleGameFinish = () => {
    if (points > highestScore) {
      localStorage.setItem("highestScore", points.toString());
      dispatch({ type: "SET_HIGHEST_SCORE", payload: points });
    }
    setGameFinished(false);
    setStartGame(false);
    setTime(10);
  };


  const generateColor = (selected) => {
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomColorIndex];

    if (color === selected) {
      setPoints(points + 1);
      setColor(randomColor);
    } else {
      setPoints(points - 1);
    }
  };

  useEffect(() => {
    const storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore !== null) {
      dispatch({ type: "SET_HIGHEST_SCORE", payload: parseInt(storedHighestScore) });
    }
  }, []);

  useEffect(() => {
    if (startGame) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        handleGameFinish()
      }, 10000);
    }
  }, [startGame]);

  return (
    <main className="board">
      <h1>Speed challenge</h1>
      <div className="conteiner">
        <aside className="counter">
          <div className="logo">
            <h2>Remaining time</h2>
            <h2>{time} seconds</h2>
            <h2>Points: {points}</h2>
            <h2>Highest Score: {highestScore}</h2> 
          </div>
        </aside>
        <section className="turn">
          <div className="colorChance">
            <Square isSelected color={color}>
              {color.toUpperCase()}
            </Square>
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
              <h3>Tu puntuacion es: {points}</h3>
              <footer>
                <button onClick={handleGameFinish}>SALIR</button>
              </footer>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
