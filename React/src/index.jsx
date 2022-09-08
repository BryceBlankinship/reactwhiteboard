import React, { useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import logo from './assets/logoNoText.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Button from './components/Buttons.jsx';
import DocumentationPage from './docs';

import GuestView from './components/Guest';
import Whiteboard from './components/Whiteboard.jsx';

import axios from 'axios';

export default function App() {
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
        <Button type='small' title="Go back" onClick={removeWhiteboard} />
        <Whiteboard />
      </>
    );
  }

}

function Version(){
  // show credits and versioning following the format major.minor.bugfixes
  return(
    <div className="version-footer">
      Made by <a href="https://www.linkedin.com/in/bryceblankinship/" target="_blank" rel="noreferrer">Bryce Blankinship</a><br></br>
      Version 1.0.0 (Alpha)
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={[<App key={'null0'}/>, <Version key={'null1'}/>]} />
        <Route path="/api" element={<DocumentationPage />} />
        <Route path="/guest" element={<GuestView />} />
        <Route path="/whiteboards" element={<App />} />
      </Routes>
    </BrowserRouter>
);

