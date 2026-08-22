import { useEffect } from "react";

export default function TypingArea({
  status,
  setStatus,
  targetText,
  typed,
  setTyped,
  setAllUserText,
  overallText,
  correct,
  setCorrect,
  allUserText,
}) {
  function hanldeStart(e) {
    setStatus("running");
  }

  const text = targetText.split("").map((letter, index) => {
    const attempted = index < typed.length;
    const correct = letter === typed[index];
    const isActive = typed.length === index;

    let targetClassname;

    if (!attempted) {
      targetClassname = "typing-area__letter-idle";
    } else {
      if (correct) {
        targetClassname = "typing-area__letter-correct";
      } else {
        targetClassname = "typing-area__letter-incorrect";
      }
    }

    if (isActive) {
      targetClassname += " active";
    }

    return (
      <span className={targetClassname} key={index}>
        {letter}
      </span>
    );
  });

  useEffect(() => {
    if (status !== "running") return;

    function handleKey(e) {

      if (e.key.length > 1 && e.key !== "Backspace") return;

      if (e.key === "Backspace") {
        if (typed[typed.length - 1] === overallText[typed.length - 1]) {
          
          if (typed.length === 0) return;

          setCorrect(prev => prev - 1);
        }

        setTyped((prev) => prev.slice(0, -1));
        setAllUserText((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key === overallText[typed.length]) {
        setCorrect(prev => prev + 1);
      }


      setTyped((prev) => prev + e.key);
      setAllUserText((prev) => prev + e.key);
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [status, allUserText.length]);

  return (
    <div className="typing-area container">
      <div
        className={
          status === "running"
            ? "typing-area__body active"
            : "typing-area__body"
        }
        onClick={hanldeStart}
      >
        <p>{text}</p>
      </div>
      <div
        className={
          status === "running"
            ? "typing-area__start active"
            : "typing-area__start"
        }
      >
        <button className="typing-area__button" onClick={hanldeStart}>
          Start test
        </button>
        <span className="typing-area__info">
          Or click the text and start typing
        </span>
      </div>
    </div>
  );
}
