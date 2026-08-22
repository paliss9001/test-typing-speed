import { use, useEffect, useState } from "react";
import largeLogo from "../assets/images/logo-large.svg";
import smallLogo from "../assets/images/logo-small.svg";

export default function Header({width, setWidth, targetWpm}) {
  
  const targetLogo = width <= 767
  ? smallLogo
  : largeLogo 
  const targetBestLabel = width <= 767
  ? "Best"
  : "Personal best"

  useEffect(() => {

    function handleLogo() {
      setWidth(document.documentElement.clientWidth)
    }

    window.addEventListener('resize', handleLogo)

    return () => window.removeEventListener('resize', handleLogo)
  }, [width])


  return (
    <header className="header container">
      <a href="/"><img className="header__logo" src={targetLogo} /></a>
      <span className="icon icon--cup header__icon">
        <span className="header__label">{targetBestLabel}:</span>
        <span className="header__wpm">{targetWpm.toFixed(0)}wpm</span>
      </span>
    </header>
  );
}
