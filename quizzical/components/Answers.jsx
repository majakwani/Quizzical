import React from "react";
import { nanoid } from "nanoid";

export default function Answers(props) {
  let index = props.questionData.index
  const buttons = props.questionData.answers.map((answer) => {
    const styles = {
      backgroundColor: "transparent"
    }
    return (
      <button type="button" key={nanoid()} style = {styles}>
        {answer}
      </button>
    );
  });
  index += 1
  return (
    <div className="question">
      <p>{props.questionData.question}</p>
      <div className="choiceContainer">{buttons}</div>
      <div className="line"></div>
    </div>
  );
}