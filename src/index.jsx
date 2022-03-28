import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Card from './Cards.jsx';
import Button from './Buttons.jsx';
import WhiteboardView from './Whiteboard';
import Draggable from 'react-draggable';

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

  useEffect(() => {
    const existingPositions = JSON.parse(localStorage.getItem('positions'));
    setPositions(existingPositions);
    setHasLoaded(true);
  }, []);

  const handleStop = (e, data) => {
    let tempPositions = { ...positions }
    const itemId = e.target.id;
    tempPositions[itemId] = {}
    tempPositions[itemId]['x'] = data.x;
    tempPositions[itemId]['y'] = data.y;
    setPositions(tempPositions);
    console.log(tempPositions);
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
        <Draggable defaultPosition={positions === null ? { x: 0, y: 0 } : !positions[1] ? { x: 0, y: 0 } : { x: positions[1].x, y: positions[1].y }} onStop={handleStop}>
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

