import { use, useState } from 'react'
import languages from "./languages"
import Language from './component/language'
import Letter from './component/letter'
import Keyboard from './component/keyboard'
import { getFarewellText } from './utils'
import { words } from './words'
import Confetti from 'react-confetti'
import clsx from 'clsx'

export default function App() {
  const [currentWord,setCurrentWord] = useState(() => generateRandomWord())
  const letterElements=currentWord.split("")
  const alphabet="abcdefghijklmnopqrstuvwxyz"
  const [guessedLetters, setGuessedLetters] =useState([])
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length-1
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function newGame(){
    setCurrentWord(generateRandomWord)
    setGuessedLetters([])
  }
  function generateRandomWord(){
    return (words[Math.floor(Math.random() *(words.length))])
  }
  function guessLetter(letter){
    setGuessedLetters(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter,letter])
    if(guessedLetters.includes(letter) && !currentWord.includes(letter)){
      
    }
  }
  const keyboardData =alphabet.split("").map(alpha => {
    const isGuessed=guessedLetters.includes(alpha)
    const isCorrect = isGuessed && currentWord.includes(alpha)
    const isWrong = isGuessed && !currentWord.includes(alpha)
    const className= clsx({
      correct: isCorrect,
      wrong: isWrong
    })
    return <Keyboard letter={alpha} key= {alpha}onClick={()=> guessLetter(alpha)} className={className} disabled={isGameOver}/>
  })

  //Create and return Boxes for the word to guess
  const wordData= letterElements.map((letter,index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName= clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )
    return <Letter className={letterClassName} letter={shouldRevealLetter? letter : ""} key={index}/>
  })

  //Create and return Language blocks
  const languageData = languages.map((lang,index) => {
    const lostLanguages = index < wrongGuessCount
    return <Language backgroundColor={lang.backgroundColor} key={index} name={lang.name} color={lang.color} className={`block ${lostLanguages ? "lost" : ""}`}/>
  }
  )
  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
        return <p>{getFarewellText(languages[wrongGuessCount-1].name)}</p>
    }

    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    } 
    if(isGameLost) {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
    else {
      return null
    }
}
  return (
    <>
    <header>    <h2 className="Title">Assembly: Endgame</h2>
    <p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
    </header>
    <div className="status" style = {{backgroundColor: isGameOver && isGameWon ? "#10A95B" : isGameOver&& isGameLost ? "red" : !isGameOver&& isLastGuessIncorrect?  "#7A5EA7" :""}}>{renderGameStatus()}</div>
    <section className="languages">{languageData}</section>
    <section className="wordspace">{wordData}</section>
    <main className="keyboardSpace">{keyboardData}</main>
    {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}
    {isGameWon && <Confetti width={1500} height={700}/>}
    </>
  )
}

