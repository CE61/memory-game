import React from "react";
import Card from "./Card";

export default function Deck(props){
    const cardElements = props.cardArray.map(
        card => <Card isClicked={card.isClicked} rune={card.rune} key={card.id} id={card.id} rgbColor={card.rgbColor.join()} handleClick={props.handleClick}/>
        );
    return(
        <div className="deck">
            {props.cardArray && cardElements}
        </div>
    );
}