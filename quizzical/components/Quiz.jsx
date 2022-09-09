import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import Loading from "./Loading";

export default function Quiz() {
  const [quizData, setQuizData] = React.useState([]); //stores info about question, all answer choices, correct answer choice
  const [loadingStatus, setLoadingStatus] = React.useState(false); // is created to render loading screen on status = true
  const [selectedAnswerData, setSelectedAnswerData] = React.useState([]); // stores info about answer, question id, answer clicked against that question id

  React.useEffect(() => {
    fetchData();
  }, []);
  // fetching data from an API call and setting the data in a state
  const fetchData = async () => {
    try {
      setLoadingStatus(true);
      const fetchedData = await fetch(
        "https://opentdb.com/api.php?command=request&amount=5&category=9&difficulty=easy&type=multiple"
      );
      const dataArr = await fetchedData.json();
      const dataToPass = dataArr.results.map((data) => {
        // adding correct answer choice in incorrect answers array  
        data.incorrect_answers.push(data.correct_answer);
        //shuffling the answer choices array
        data.incorrect_answers = data.incorrect_answers.sort(
          () => Math.random() - 0.5
        );
        return {
          question: data.question,
          answers: data.incorrect_answers,
          correct_answer: data.correct_answer,
          id: nanoid(),
        };
      });
      setQuizData(dataToPass);
      let count = 0
      const updatedArr = dataToPass.map(data => {
        count += 1
        return {
            questionId: data.id,
            value: ""
        }
    })
    setSelectedAnswerData(updatedArr)
    } catch {
      alert("Error Occured");
      location.reload();
    } finally {
      setLoadingStatus(false);
    }
  };
  
  //when user clicks an answer, it updates selectedAnswerData and updates the value of answer that user selected
  function answerClick(questionId, answerSelected) {
      setSelectedAnswerData(prevData => prevData.map(data => {
        return data.questionId === questionId ?
        {...data, value: answerSelected}:
        data
      }))
    }
    console.log(selectedAnswerData)

  // creating components for every data items in every index of the state array.
  const finalData = quizData.map((properties) => {
    return (
      <Question
        key={properties.id}
        data={properties}
        clickEvent={answerClick}
        answerData = {selectedAnswerData}
      />
    );
  });

  return (
    <section className="quiz">
      {loadingStatus && <Loading />}
      {!loadingStatus && finalData}
      <button>Check answers</button>
    </section>
  );
}
