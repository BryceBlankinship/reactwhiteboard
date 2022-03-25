import React from 'react';
import './buttons.css';

export default function Button(props){

    const handleClick = () => {
        if(typeof props.onClick === 'function'){
            // run passed onClick behavior if applicable
            props.onClick();
        }else{
            console.log('No onClick property passed to TextButton');
        }
    }

    return(
        <button className={props.type} style={{ fontSize: props.fontSize }} onClick={handleClick}>{props.title}</button>
    );
}