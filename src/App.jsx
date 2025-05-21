import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2 className="Title">Assembly: Endgame</h2>
    <p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
    <main></main>
    </>
  )
}

