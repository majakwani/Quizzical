import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  let count = props.questionData.index
  const styles = {
    backgroundColor: "",
    color: "yellow"
  };
  const buttons = props.questionData.answers.map((answer) => {
    styles.backgroundColor = answer === props.answerData[count].value ? 
    "#D6DBF4" :
    "transparent"
      return (
        <button
        type="button"
        style={styles}
        key={nanoid()}
        onClick={() => props.clickEvent(props.questionData.id, answer)}
        >
        {answer}
      </button>
    );
  });
  count += 1
  return (
    <div className="question">
      <p>{props.questionData.question}</p>
      <div className="choiceContainer">{buttons}</div>
      <div className="line"></div>
      </div>
  );
}
