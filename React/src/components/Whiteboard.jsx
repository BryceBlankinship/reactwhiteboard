import React, { Component } from 'react';
import getWhiteboard, { createPosition } from '../http-methods.js';
import Button from './Buttons.jsx';
import Card from './Cards.jsx';
import './whiteboard.css';

export default class Whiteboard extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            cards: [],
            hasLoaded: false
        }

        this.createCard = this.createCard.bind(this);
    }


    async createCard(){
        // Check if the array length is 0, if not send POST request with last item in cards[].id
        if(this.state.cards.length === 0){
            try{
                await createPosition(this.props.whiteboard_id, 1, 0, 50);
            }catch(err){
                console.log(err);
            }
        }else{
            try{
                await createPosition(this.props.whiteboard_id, this.state.cards[this.state.cards.length - 1].id + 1, 0, 50);
            }catch(err){
                console.log(err);
            }
        }

        
        this.setState({ cards: await getWhiteboard(this.props.whiteboard_id) }, () => {
            console.log(this.state.cards)
        });
    }

    async componentDidMount(){
        this.setState({ cards : await getWhiteboard(this.props.whiteboard_id) }, () => {
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
                        <Card key={'CARD-' + card.id} whiteboard_id={this.props.whiteboard_id} id={card.id}/>
                    ))
                }

            </div>
        ) : null;
    }
}


export class WhiteboardMenu extends Component {
    
    async componentDidMount(){
        // get configurations from the server (if i even have to)
    }

    render(){
        return(
            <div className="whiteboard-menu-container">
                
            </div>
        );
    }
}