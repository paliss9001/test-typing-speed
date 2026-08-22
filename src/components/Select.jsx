import { useState } from "react";

export default function Select({ options, activeState, setActiveState, placeholder = "Select option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { label, optionsData } = options
  const dataKeys = Object.keys(optionsData)

  function handleOptionClick(option, e) {
    setIsOpen(false);
    setActiveState(e.target.dataset['info'])
  }


  return (
    <div className="select">
      <button
        className="select__trigger options__item options__item--select"
        onClick={() => setIsOpen(!isOpen)}

      >
        {optionsData[activeState]}
      </button>
      {isOpen && (
        <ul className="select__menu">
          {dataKeys.map((option) => (
            <button
              key={option}
              className={option === activeState ? "container__item options__item active" : "container__item options__item"}
              onClick={(e) => handleOptionClick(option, e)}
              data-info={option}
            >
              {option}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}