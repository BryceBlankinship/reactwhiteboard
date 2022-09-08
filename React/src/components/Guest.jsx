import React, { Component } from 'react';
import Whiteboard from './Whiteboard';
import './guest.css';

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
                <Whiteboard whiteboard_id={0} user="guest"/>
            </>
        );
    }

}