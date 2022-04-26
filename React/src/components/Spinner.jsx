import React, { Component } from 'react';
import './spinner.css';

export default class Spinner extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

}