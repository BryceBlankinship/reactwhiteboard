import React, { useState, useEffect } from 'react';
import './spinner.css';

export default function Spinner() {
    const [show, setShow] = useState(false);

    // only show the spinner after 500ms... this is to reduce motion on the screen for data has too fast of a response time for the spinner to be effective
    useEffect(() => {
        setInterval(() => {
            setShow(true);
        }, 500);
    }, [])

    return show ? (
        <div className="spinner-container">
            <div className="loading spinner"></div>
        </div>
    ) : null;

}