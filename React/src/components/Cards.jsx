import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './cards.css';
import { updatePosition, deletePosition, updateTitle, updateDesc } from '../http-methods';

export default function Card({ card, positionChanged, setPositionChanged }) {
    const { title, desc, whiteboard_id, id, positionX, positionY } = card;
    const [showMenu, setShowMenu] = useState(false);
    const [positions, setPositions] = useState([positionX || 0, positionY || 200]);
    const [hasLoaded, setHasLoaded] = useState(true);
    const [titleState, setTitle] = useState(title);
    const [descState, setDesc] = useState(desc);

    useEffect(() => {
        console.log('POSITIONS FOR ID ' + id, positions);
        setPositionChanged(!positionChanged);
    }, [positions]);

    useEffect(() => {
        updateTitle(whiteboard_id, id, titleState);
    }, [titleState]);

    useEffect(() => {
        updateDesc(whiteboard_id, id, descState);
    }, [descState]);

    const handleStop = (event, dragElement) => {
        setPositions([dragElement.x, dragElement.y]);
        updatePosition(whiteboard_id, id, dragElement.x, dragElement.y);
    }

    const handleTrash = () => {
        setPositions([]);
        deletePosition(whiteboard_id, id);
        setHasLoaded(false);
        console.log("Deleted Card with ID: " + id)
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleTitle = (e) => {
        setTitle(whiteboard_id, id, e.target.value);
    }

    const handleDesc = (e) => {
        setDesc(whiteboard_id, id, e.currentTarget.innerText);
    }

    const createChild = async () => {
        console.log("Creating a child for Card ID: " + id);
    }

    return hasLoaded && (<>
        <Draggable bounds={{ top: 0 }} handle='.move' defaultPosition={{ x: positions[0], y: positions[1] }} onStop={handleStop}>
            <div className="center-container">
                <div className="card-container">
                    <div className="card-icon-container">
                        <button className='icon add-circle' onClick={createChild}></button>
                        <button className='icon move'></button>
                        <button className='icon trash' onClick={handleTrash}></button>
                        <button className='icon verticaldots' onClick={toggleMenu}></button>
                        <CardMenu showMenu={showMenu} />
                    </div>
                    <textarea className='card-title' defaultValue={titleState} onChange={handleTitle}></textarea>
                    <span className='card-desc' contentEditable={true} onInput={handleDesc}>{descState}</span>
                </div>
            </div>
        </Draggable>
        </>
    );

}

export function CardMenu(props) {
    return props.showMenu ? (
        <div className="card-menu">
            <form>
                <input type="checkbox" /> Show Description<br />
                <input type="checkbox" /> Show State<br />
                <input type="checkbox" /> Is Context Provider<br />
                <input type="submit" value="Apply" onClick={(e) => {
                    e.preventDefault();
                }} />
            </form>
        </div>
    ) : null;
}