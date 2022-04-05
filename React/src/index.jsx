import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Card from './Cards.jsx';
import Button from './Buttons.jsx';
import WhiteboardView from './Whiteboard';
import Draggable from 'react-draggable';

import getWhiteboard, { createPosition, getPosition, postPosition, updatePosition } from './http-methods';
import e from 'express';

export default function HomeView() {
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const createWhiteboard = () => {
    setWhiteboardActive(true);
  }

  const removeWhiteboard = () => {
    setWhiteboardActive(false);
  }

  const handleStop = (e, data) => {
  }

  useEffect(() => {
    localStorage.setItem('positions', JSON.stringify(positions))
  }, [positions]);

  if (whiteboardActive) {
    return (
      <>
        <Button type='text' title="Go back" onClick={removeWhiteboard} />
        <WhiteboardView />
      </>
    );
  } else {
    return hasLoaded ? (
      <>

        <Draggable defaultPosition={hasLoaded ? {x: 50, y: 100} : {x: 0, y: 0}} onStop={handleStop}>
          <h1 id={1}>React Whiteboard</h1>
        </Draggable>

        <p>A React Component visualization tool for hybrid developer/designer teams.</p>

        <Button type='text' title='Create a new whiteboard' fontSize='24px' onClick={createWhiteboard} />
      </>
    ) : null;
  }

}

ReactDOM.render(
  <React.StrictMode>
    <HomeView />
  </React.StrictMode>,
  document.getElementById('root')
);

