import React from "react";

export default function Card(props){
    // Commented sections are for keeping track of selections when uncommented
    // const clickedBorder = props.isClicked ? {border: "1rem dashed red"} : {border: "none"};
    return(
        <div className="card" /*style={clickedBorder}*/ onClick={()=>props.handleClick(props.id, props.isClicked)}><span>{props.rune}</span></div>
    );
}