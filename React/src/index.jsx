import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Button from './Buttons.jsx';
import WhiteboardView from './Whiteboard';

export default function HomeView() {
  const [whiteboardActive, setWhiteboardActive] = useState(false);

  const createWhiteboard = () => {
    setWhiteboardActive(true);
  }

  const removeWhiteboard = () => {
    setWhiteboardActive(false);
  }


  if (whiteboardActive) {
    return (
      <>
        <Button type='text' title="Go back" onClick={removeWhiteboard} />
        <WhiteboardView />
      </>
    );
  } else {
    return(
      <>

        <h1 id={-1}>React Whiteboard</h1>
        <p>A React Component visualization tool for hybrid developer/designer teams.</p>

        <Button type='text' title='Create a new whiteboard' fontSize='24px' onClick={createWhiteboard} />
      </>
    );
  }

}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeView />
  </React.StrictMode>
);

