import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import Loading from "./Loading";
import Answers from "./Answers";

export default function Quiz(props) {
  const [quizData, setQuizData] = React.useState([]); //stores info about question, all answer choices, correct answer choice
  const [loadingStatus, setLoadingStatus] = React.useState(false); // is created to render loading screen on status = true
  const [selectedAnswerData, setSelectedAnswerData] = React.useState([]); // stores info about answer, question id, answer clicked against that question id
  const [checkAnswer, setCheckAnswer] = React.useState(false);
  const [count, setCount] = React.useState(0);

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
      let count = -1;
      const dataToPass = dataArr.results.map((data) => {
        count += 1;
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
          index: count,
        };
      });
      setQuizData(dataToPass);
      const updatedArr = dataToPass.map((data) => {
        return {
          questionId: data.id,
          value: "",
        };
      });
      setSelectedAnswerData(updatedArr);
    } catch {
      alert("Error Occured");
      location.reload();
    } finally {
      setLoadingStatus(false);
    }
  };

  //when user clicks an answer, it updates selectedAnswerData and updates the value of answer that user selected
  function answerClick(questionId, answerSelected) {
    setSelectedAnswerData((prevData) =>
      prevData.map((data) => {
        return data.questionId === questionId
          ? { ...data, value: answerSelected }
          : data;
      })
    );
  }

  // creating components for every data items in every index of the state array.
  const questionData = quizData.map((properties) => {
    return (
      <Question
        key={properties.id}
        clickEvent={answerClick}
        questionData={properties}
        answerData={selectedAnswerData}
      />
    );
  });

  const answerData = quizData.map((properties) => {
    return (
      <Answers
        key={properties.id}
        questionData={properties}
        answerData={selectedAnswerData}
      />
    );
  });

  function checkForAnswers() {
    return selectedAnswerData.every((element) => element.value !== "");
  }

  function correctAnswer() {
    for (let i = 0; i < 5; i++) {
      if (selectedAnswerData[i].value === quizData[i].correct_answer) {
        setCount((current) => current + 1);
      } else {
        continue;
      }
    }
  }

  function displayAnswer() {
    if (checkForAnswers()) {
      setCheckAnswer(true);
      correctAnswer();
    } else {
      alert("Select answer choice for every question");
    }
    return;
  }

  function resetGame() {
    setQuizData([]);
    setSelectedAnswerData([]);
    setCheckAnswer(false);
    setCheckAnswer(false);
    props.resetGame();
  }
  return (
    <section className="quiz">
      {checkAnswer && answerData}
      {checkAnswer && checkForAnswers() && (
        <div className="score">
          <span>You score {count}/5 correct answers</span>
          <button type="button" onClick={resetGame}>
            Play again
          </button>
        </div>
      )}
      {!checkAnswer && loadingStatus && <Loading />}
      {!checkAnswer && !loadingStatus && questionData}
      {!checkAnswer && !loadingStatus && (
        <button type="button" onClick={displayAnswer}>
          Check answers
        </button>
      )}
    </section>
  );
}
