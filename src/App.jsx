import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Options from "./components/Options";
import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import resultsIcon from './assets/images/icon-completed.svg';
import scoreSmashedIcon from './assets/images/icon-new-pb.svg';


async function fetchText() {
  const response = fetch("data.json");

  return (await response).json();
}
const textsCollection = await fetchText();
const MAX_TIME = 60;
let startTime = Date.now();

if (!localStorage.getItem('wpm')) {
  localStorage.setItem('wpm', 0)
}

function App() {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [activeDifficulty, setActiveDifficulty] = useState("easy");
  const [activeMode, setActiveMode] = useState("timed");
  const [status, setStatus] = useState("idle");
  const [nextLine, setNextLine] = useState(1);
  const [typed, setTyped] = useState("");
  const [allUserText, setAllUserText] = useState("");
  const [seconds, setSeconds] = useState(MAX_TIME);
  // const [result, setResult] = (doesExist ? "new record" : "baseline")

  
  const targetWPpm = localStorage.getItem('wpm')
  const [correct, setCorrect] = useState(0)
  const accuracy = (correct / allUserText.length) * 100;


  const notRecord = {
    src: resultsIcon,
    title: "Test Complete",
    subtitle: "Solid run. Keep pushing to beat your high score."
  }

  const targetText = getText(
    textsCollection[activeDifficulty].slice(nextLine - 1, nextLine),
  );

  const overallText = textsCollection[activeDifficulty].reduce((acc, curr) => {
    const { text } = curr;

    return acc + text;
  }, "");

  function handleRestart(e) {
    e.target.closest("button").blur();

    setStatus("running");
    reset();
  }

  useEffect(() => {

    if (allUserText.length === overallText.length) {
      setStatus("finished");
    }

    if (typed.length === targetText.length) {
      setNextLine(nextLine + 1);
      setTyped("");
    }

    if (status === "finished") {
      // reset();
    }
  }, [status, typed.length]);

  function reset() {
    setSeconds(MAX_TIME);
    setNextLine(1);
    setTyped("");
    setAllUserText("");
    setCorrect(0);
    setStatus('idle')
    startTime = Date.now()
  }

  return (
    <>
      <Header width={width} setWidth={setWidth} targetWpm={+targetWPpm} />
      <main>
        <div className="controls container">
          <Stats
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            seconds={seconds}
            setSeconds={setSeconds}
            status={status}
            setStatus={setStatus}
            allUserText={allUserText}
            accuracyRate={accuracy}
          />
          <Options
            width={width}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            activeDifficulty={activeDifficulty}
            setActiveDifficulty={setActiveDifficulty}
            reset={reset}
          />
        </div>
        <TypingArea
          status={status}
          setStatus={setStatus}
          targetText={targetText}
          typed={typed}
          setTyped={setTyped}
          setAllUserText={setAllUserText}
          overallText={overallText}
          correct={correct}
          setCorrect={setCorrect}
          allUserText={allUserText}
        />
      </main>
      <div
        className={
          status === "running"
            ? "restart container active"
            : "restart container"
        }
      >
        <button className="restart__button" onClick={handleRestart}>
          <span className="icon icon--restart">Restart</span>
        </button>
      </div>
      <Results
        {...notRecord} 
        status={status}
        allUserText={allUserText}
        correct={correct}
        setCorrect={setCorrect}
        reset={reset}
        setStatus={setStatus}
        startTime={startTime}
        targetWPpm={+targetWPpm}
      />
    </>
  );
}

function getText(array) {
  return array
    .map((textData) => {
      const { text } = textData;

      return text;
    })
    .join(" ");
}

export default App;
