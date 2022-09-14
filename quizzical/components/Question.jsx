import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  let index = props.questionData.index
  
  const buttons = props.questionData.answers.map((answer) => {
    const styles = {
      backgroundColor: "transparent",
    };
    styles.backgroundColor = answer === props.answerData[index].value ? 
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
  index += 1
  return (
    <div className="question">
      <p>{props.questionData.question}</p>
      <div className="choiceContainer">{buttons}</div>
      <div className="line"></div>
      </div>
  );
}
