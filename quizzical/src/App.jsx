import React from 'react'
import FirstPage from '../components/FirstPage'
import Quiz from '../components/Quiz'

export default function App(){

  const [gameStart, setGameStart] = React.useState(false)

  function changePage(){
    setGameStart(current => !current)
  }

  return (
    <main>
        {!gameStart && <FirstPage eventHandler = {changePage} />}
        
        {gameStart && <Quiz 
        resetGame = {changePage}
        /> }
        
    </main>
  )
}