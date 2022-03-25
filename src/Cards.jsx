import React, { useState } from 'react';
import './cards.css';

import { useDrag } from 'react-dnd';

export default function Card(props){
    const [showMenu, setShowMenu] = useState(false);

    return(
        <div className="center-container">
            <div className="card-container">
                <div className="card-icon-container">
                    <button className='icon move'></button>
                    <button className='icon verticaldots' onClick={() => {setShowMenu(!showMenu)}}></button>
                    {showMenu ? <CardMenu/> : null}
                </div>
                <textarea className='card-title' defaultValue={props.title}></textarea>
                <span className='card-desc' contentEditable={true} defaultValue={props.desc}></span>
            </div>
        </div>
    );
}

export function CardMenu(props){
    return(
        <div className="card-menu">
            <form>
                <input type="checkbox"/> Show Description<br/>
                <input type="checkbox"/> Show State<br/>
                <input type="checkbox"/> Is Context Provider<br/>
                <input type="submit" value="Apply" onClick={(e) => {
                    e.preventDefault();
                }}/>
            </form>
        </div>
    );
}