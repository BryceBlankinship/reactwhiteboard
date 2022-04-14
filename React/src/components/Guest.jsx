import React, { Component } from 'react';
import Button from './Buttons';
import Whiteboard from './Whiteboard';

/**
 * 
 * Guest view is going to be pretty different functionally from the other views
 * So going to have a new file to play around with passing all the functionality to the Card component
 * 
 */

export default class GuestView extends Component {

    render(){
        return(
            <>
                <h1>Welcome to React Whiteboard - Guest Version</h1>
                <p>Play around with React Whiteboard before you <s>realize you should</s> create an account!</p>
                <p><b>Important Note:</b> Data gets <b>deleted</b> if you exit this tab in Guest mode</p>

                <Whiteboard whiteboard_id={0} user="guest"/>
            </>
        );
    }

}