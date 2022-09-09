import React from 'react'
import FirstPage from '../components/FirstPage'
import Quiz from '../components/Quiz'

export default function App(){

  const [gameStart, setGameStart] = React.useState(false)

  function changePage(){
    setGameStart(!gameStart)
  }

  function changeLoadingStatus(){
    setLoadingStatus(!loadingStatus)
  }

  return (
    <main>
        {!gameStart && <FirstPage eventHandler = {changePage} />}
        
        {gameStart && <Quiz /> }
        
    </main>
  )
}