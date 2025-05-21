import { use, useState } from 'react'
import languages from "./languages"
import Language from './component/language'
import Letter from './component/letter'
import Keyboard from './component/keyboard'

export default function App() {
  const [currentWord,setCurrentWord] = useState("Temporary")
  const letterElements=currentWord.split("")
  const alphabet="abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] =useState([])

  function guessLetter(letter){
    setGuessedLetters(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter,letter])
  }
  console.log(guessedLetters)
  const keyboardData =alphabet.split("").map(alpha => {
    return <Keyboard letter={alpha} key= {alpha}onClick={()=> guessLetter(alpha)}/>
  })
  const wordData= letterElements.map((letter,index) => {
    return <Letter letter={letter} key={index}/>
  })
  const languageData = languages.map((lang,index) => {
    return <Language backgroundColor={lang.backgroundColor} key={index} name={lang.name} color={lang.color}/>
  }
  )
  return (
    <>
    <header>    <h2 className="Title">Assembly: Endgame</h2>
    <p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
    </header>
    <div className="status"><h2>You win!</h2><p>Congratulations!</p></div>
    <section className="languages">{languageData}</section>
    <section className="wordspace">{wordData}</section>
    <main className="keyboardSpace">{keyboardData}</main>
    <button className="new-game">New Game</button>
    </>
  )
}

