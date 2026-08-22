import Select from "./Select";

export default function Options({
  width,
  activeMode,
  setActiveMode,
  activeDifficulty,
  setActiveDifficulty,
  reset
}) {
  const difficultyData = {
    label: "Difficulty",
    optionsData: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
  };

  const modeData = {
    label: "Mode",
    optionsData: {
      timed: "Timed(60s)",
      passage: "Passage",
    },
  };

  const targetOptions =
    width <= 767 ? (
      <>
        <Select
          options={difficultyData}
          activeState={activeDifficulty}
          setActiveState={setActiveDifficulty}
          placeholder="Difficulty"
        />

        <Select
          options={modeData}
          activeState={activeMode}
          setActiveState={setActiveMode}
          placeholder="Mode"
        />
      </>
    ) : (
      <>
        <OptionsList
          data={difficultyData}
          activeState={activeDifficulty}
          setActiveState={setActiveDifficulty}
          reset={reset}
        />
        <OptionsList
          data={modeData}
          activeState={activeMode}
          setActiveState={setActiveMode}
          reset={reset}
        />
      </>
    );

  return <div className="options">{targetOptions}</div>;
}

function OptionsList({ data, activeState, setActiveState, reset }) {
  const { label, optionsData } = data;
  const dataKeys = Object.keys(optionsData);

  function handleState(e) {
    setActiveState(e.target.dataset["info"]);
    reset()
  }

  return (
    <div className="options__body">
      <span className="options__label">{label}:</span>
      <ul className="options__list">
        {dataKeys.map((option, index) => {
          return (
            <button
              key={option}
              className={
                option === activeState
                  ? "options__item active"
                  : "options__item"
              }
              data-info={option}
              onClick={handleState}
            >
              {optionsData[option]}
            </button>
          );
        })}
      </ul>
    </div>
  );
}
