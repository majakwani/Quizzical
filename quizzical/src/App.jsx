import React from 'react'
import FirstPage from '../components/FirstPage'
import Quiz from '../components/Quiz'

export default function App(){

  const [firstPage, setFirstPage] = React.useState(true)

  function changePage(){
    setFirstPage(!firstPage)
  }

  return (
    <main>
        {firstPage && <FirstPage eventHandler = {changePage} />}
        {!firstPage && 
        <Quiz ques />
        }
        
    </main>
  )
}