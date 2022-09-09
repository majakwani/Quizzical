import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  let count = 0
  const buttons = props.data.answers.map((answer) => {
    const styles = {
        backgroundColor: answer === props.answerData[count].value ? "#D6DBF5" : "transparent"
    }
    console.log(props.answerData[count], answer)
    count += 1
    return (
        <button
        key={nanoid()}
        type="button"
        onClick={() => props.clickEvent(props.data.id, answer)}
        style = {styles}
        >
        {answer}
      </button>
    );
  });
  return (
    <div className="question">
      <p>{props.data.question}</p>
      <div className="choiceContainer">
        {buttons}
      </div>
      <div className="line"></div>
    </div>
  );

}
