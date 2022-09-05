import React, { useState, useEffect } from 'react';
import getWhiteboard, { createPosition, getChildren, getPosition } from '../http-methods.js';
import Button from './Buttons.jsx';
import Spinner from './Spinner.jsx';
import Navbar from './Navbar.jsx';
import LineTo, { Line } from 'react-lineto';
import './whiteboard.css';

import Card from "./Cards.jsx";

export default function Whiteboard(props) {
    const [cards, updateCards] = useState();
    const [positionChanged, setPositionChanged] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        async function run() {
            updateCards(await getWhiteboard(props.whiteboard_id));
            setHasLoaded(true);
        }

        run();
    }, []);

    useEffect(() => {
        async function run(){
            updateCards(await getWhiteboard(props.whiteboard_id));
            setHasLoaded(true);
        }

        run();
    }, [positionChanged]);



    const createCard = async () => {
        // Check if the array length is 0, if not send POST request with last item in cards[].id
        console.log(cards.length)
        if (cards.length === 0) {
            try {
                await createPosition(props.whiteboard_id, 1, 0, 50);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await createPosition(props.whiteboard_id, cards[cards.length - 1].id + 1, 0, 200);
            } catch (err) {
                console.log(err);
            }
        }

        updateCards([...cards, await getWhiteboard(props.whiteboard_id)]);
    }

    function getCardById(id){
        for (const card in cards){
            if(id === cards[card].id){
                return cards[card];
            }
        }
    }

    return hasLoaded ? (
        <>
            <Navbar createCard={createCard} />
            <div className="whiteboard-container">
                <p>Welcome to your Whiteboard!</p>
                <p>Begin by <Button type='text' title='creating a component' fontSize='15px' onClick={createCard}></Button></p>

                {cards.map((card, index) => {
                    let childPositions = [];
                    card.children && card.children.length > 0 && card.children.map((child_id) => {
                        childPositions.push(<Line key={'LINE_' + index} borderColor='gray' x0={card.positionX + 720} y0={card.positionY+279} x1={getCardById(child_id).positionX+720} y1={getCardById(child_id).positionY+91} />)  
                    })
                    return(
                        <>
                            <div>{childPositions}</div>
                            <Card key={'CARD_' + index} card={card} positionChanged={positionChanged} setPositionChanged={setPositionChanged} />
                        </>
                    )
                })}
                
            </div>
        </>
    ) : <Spinner />;
}
