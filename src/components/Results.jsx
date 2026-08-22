import { useEffect } from "react";
import Header from "./Header";

export default function Results({
  src,
  title,
  subtitle,
  status,
  correct, 
  allUserText,
  reset,
  setStatus,
  startTime,
  targetWPpm,

}) {

  if (status !== "finished") return; 

  let factor = 60 - Math.floor((Date.now() - startTime) / 1000);
  const elapsed = 60 - factor
  const wpm = (allUserText.length / 5) / (elapsed / 60);


  if (wpm > targetWPpm) {
    localStorage.setItem('wpm', wpm)
  }
  function handleRestart() {
    setStatus("idle")
    reset()
  }

  const accuracy = (correct / allUserText.length) * 100;

  return (
    <>
    <div className={status === "finished" ? "results active" : "results"}>
      <Header targetWpm={+targetWPpm} />
      <div className="results__body container">
        <img className="results__icon" src={src} />
        <h1 className="results__title">{title}</h1>
        <span className="results__subtitle">{subtitle}</span>
        <dl className="results__list">
          <div className="results__item">
            <dt className="results__term">WPM:</dt>
            <dd className="results__data results__data-wpm">{wpm.toFixed(0)}</dd>
          </div>
          <div className="results__item">
            <dt className="results__term">Accuracy:</dt>
            <dd className="results__data results__data-accuracy">{accuracy.toFixed(0)}%</dd>
          </div>
          <div className="results__item">
            <dt className="results__term">Characters:</dt>
            <dd className="results__data">
              <span className="results__data-correct">{correct}</span>
              /
              <span className="results__data-incorrect">{allUserText.length - correct}</span>
            </dd>
          </div>
        </dl>
        <button className="results__restart" onClick={handleRestart}>
          <span className="icon icon--restart">Go again</span>
        </button>
      </div>
    </div>
    </>
  )
}