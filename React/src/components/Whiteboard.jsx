import React, { Component } from 'react';
import { renderMatches } from 'react-router-dom';
import getWhiteboard, { createPosition } from '../http-methods.js';
import Button from './Buttons.jsx';
import Card from './Cards.jsx';
import './whiteboard.css';

export class WhiteboardOverview extends Component {
    render(){
        return(
            <>
                <h1>Your Whiteboards</h1>
            </>
        );
    }
}

// simply storing card ids in an array
let cards = getWhiteboard(1);

export default class WhiteboardView extends Component {
    render(){
        return (
            <div className="whiteboard-page-container">
                <input className='input-whiteboardname' placeholder='My Whiteboard'></input>
                <Whiteboard />
            </div>
        );
    }
}

export class Whiteboard extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            cards: [],
            hasLoaded: false
        }

        this.createCard = this.createCard.bind(this);
    }


    async createCard(){
        // Add a card to the array of cards, it will automatically get created in database via Cards.jsx
        if(this.state.cards.id === undefined){
            try{
                await createPosition(1, 1, 50, 50);
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                await createPosition(1, this.state.cards.at(-1).id + 1, 50, 50);
            }catch(err){
                console.log(err);
            }
        }

        
        this.setState({ cards: await getWhiteboard(1) }, () => {
            console.log(this.state.cards)
        });
    }

    async componentDidMount(){
        this.setState({ cards : await getWhiteboard(1) }, () => {
            console.log(this.state.cards);
            this.setState({hasLoaded: true})
        });
    }

    render(){
        return this.state.hasLoaded ? (
            <div className="whiteboard-container">
                <p>Welcome to your Whiteboard!</p>
                <p>Begin by <Button type='text' title='creating a component' fontSize='15px' onClick={this.createCard}></Button></p>        
                
                {
                    this.state.cards.map((card) => (
                        <Card key={'CARD-' + card.id} id={card.id}/>
                    ))
                }

            </div>
        ) : null;
    }
}