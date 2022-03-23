import React, { Component } from 'react';
import './cards.css';

import { useDrag } from 'react-dnd';

export default function Card(props){

    return(
        <div className="center-container">
            <div className="card-container">
                <h1 className='card-title'>{props.title}</h1>
                <p className='card-desc'>{props.desc}</p>
            </div>
        </div>
    );
}