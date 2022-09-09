import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function Quiz(){

    const [quizData, setQuizData] = React.useState([])
    const [loadingStatus, setLoadingStatus] = React.useState(false)

    function clickEvent(answerId, questionId){
        
    }

// fetching data from an API call and setting the data in a state
  React.useEffect(()=> {
      
      console.log(loadingStatus, "1") 
      setLoadingStatus(current => !current)
      console.log(loadingStatus, "2") 

        const fetchData = async () => {   
        const fetchedData = await fetch("https://opentdb.com/api.php?command=request&amount=5&category=9&difficulty=easy&type=multiple")
        try{
            const dataArr = await fetchedData.json()
            const data = dataArr.results.map(question => {
            question.incorrect_answers.push(question.correct_answer)
            const choicesData = question.incorrect_answers.map(choice => {
            
                return {
                    choice: choice,
                    choiceId: nanoid(),
                    isClicked: false
                }

            })

          return {
            question: question.question,
            choices: choicesData,
            id: nanoid(),
          }

        })

        setQuizData(data)
        }

        catch{
            alert("Error Occured")
            location.reload()
        }

        finally{
            console.log(loadingStatus, "3")
            setLoadingStatus(current => !current)
            console.log(loadingStatus, "4")
        }

    }
    fetchData()
}
  ,[])

    // creating components for every data items in every index of the state array.
    const finalData = quizData.map(properties => {
        return (
            <Question 
            key = {properties.id}
            questionId = {properties.id}
            question = {properties.question}
            choices = {properties.choices}
            clickEvent = {clickEvent}
            />
        )
    })

    return (
<section className="quiz">
        {finalData}
        <button>Check answers</button>
    </section>
    )
}