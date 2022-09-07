import React from "react";
import { useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(){

    const [questionData, setQuestionData] = React.useState([])

    function clickEvent(id){
        setQuestionData(prevData => {
            
        })    
    }

// fetching data from an API call and setting the data in a state
  React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?command=request&amount=5&category=21&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(output => {
        const data = output.results.map(question => {
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
        setQuestionData(data)
        })
    }, [])

    // creating components for every data items in every index of the state array.
    const finalData = questionData.map(properties => {
        return (
            <Question 
            key = {properties.id}
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