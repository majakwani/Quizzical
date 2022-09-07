import React from "react";

export default function FirstPage(props){
    return (
        <section className="firstPage">
            <p className="heading">Quizzical</p>
            <p className="description">Fun Little Quizz App</p>
            <button type="button" onClick={props.eventHandler} >Start quiz</button>
        </section>
    )
}