import React from 'react';
import Button from './Buttons.jsx';
import Card from './Cards.jsx';
import './whiteboard.css';

// simply storing card ids in an array
let cards = []



export default function WhiteboardView() {
    return (
        <div className="whiteboard-page-container">
            <input className='input-whiteboardname' placeholder='My Whiteboard'></input>
            <Whiteboard />
        </div>
    );
}

export function Whiteboard() {
    return (
        <div className="whiteboard-container">
            <p>Welcome to your Whiteboard!</p>
            <p>Begin by <Button type='text' title='creating a component' fontSize='15px' onClick={() => {
                createEntity('title', 'desc')
            }}></Button></p>

            <p>Update <Button type='text' title='here' fontSize='15px' onClick={() => {
                updateEntity(2, 'newTitle', 'newDesc')
            }}></Button></p>

            <p>Delete <Button type='text' title='here' fontSize='15px' onClick={() => {
                deleteEntity(2)
            }}></Button></p>

            <Card id={1} title='test' desc='desc'/>
            <Card id={2} title='test' desc='desc'/>
            <Card id={3} title='test' desc='desc'/>
            <Card id={4} title='test' desc='desc'/>
            
        </div>
    );
}
