import React from "react";

export default function Question(props){

        let currentIndex = props.choices.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [props.choices[currentIndex].choice, props.choices[randomIndex].choice] = [
            props.choices[randomIndex].choice, props.choices[currentIndex].choice];
        }

    return (
        <div>
            <div className="question">
                <p>
                {props.question}
            </p>
            <div className="choiceContainer">
                <button style = {{backgroundColor: props.choices[0].isClicked ? "D6DBF5" : "transparent"}} onClick={()=> props.clickEvent(props.choices[0].choiceId)}>{props.choices[0].choice}</button>
                <button style = {{backgroundColor: props.choices[1].isClicked ? "D6DBF5" : "transparent"}} onClick={()=> props.clickEvent(props.choices[1].choiceId)}>{props.choices[1].choice}</button>
                <button style = {{backgroundColor: props.choices[2].isClicked ? "D6DBF5" : "transparent"}} onClick={()=> props.clickEvent(props.choices[2].choiceId)}>{props.choices[2].choice}</button>
                <button style = {{backgroundColor: props.choices[3].isClicked ? "D6DBF5" : "transparent"}} onClick={()=> props.clickEvent(props.choices[3].choiceId)}>{props.choices[3].choice}</button>
            </div>
                <div className="line"></div>
            </div>
            </div>
    )
}