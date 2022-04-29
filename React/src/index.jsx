import React, { useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import logo from './assets/logoNoText.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Button from './components/Buttons.jsx';
import DocumentationPage from './docs';
import Auth from './components/Auth.jsx';

import GuestView from './components/Guest';
import Whiteboard from './components/Whiteboard.jsx';
import AuthContext, { authContext } from './contexts/AuthContext';

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
  } else {
    return (
      <HomeView onClick={createWhiteboard} />
    );
  }

}

function HomeView() {
  const user = useContext(authContext);

  const handleLogout = () => {
    axios.get("https://reactwhiteboard.herokuapp.com/auth/logout", { withCredentials: true }).then(res => {
      if (res.data) {
        window.location.href = "/";
      }
    });
  }

  if (user) {
    console.log("Context exists!")
    return (
      <>
        <Greeting />
        {user.username}

        <Button type='small' title='Logout' fontSize='14px' onClick={handleLogout} />
      </>
    );
  } else {
    console.log("Context does not exist :(")
    return (
      <>
        <div className="header">
          <h1>React Whiteboard</h1>
          <img src={logo} alt="React Whiteboard Logo" width={247} height={181.5}></img>
          <p>A React Component Whiteboarding Tool<br></br>for Developer &#38; Designer Teams.</p>
        </div>

        <Auth greeting={<Greeting />} />
      </>
    );
  }
}

function Greeting() {
  let greeting = '';
  let date = new Date();
  let h = date.getHours();

  if (h > 0 && h <= 12) {
    greeting = 'Good morning';
  } else if (h > 12 && h <= 18) {
    greeting = 'Good afternoon';
  } else if (h > 18 && h <= 24) {
    greeting = 'Good evening';
  }

  return (
    <div className="greeting-header">
      {greeting}
    </div>
  );
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
  <AuthContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={[<App key={'null0'}/>, <Version key={'null1'}/>]} />
        <Route path="/api" element={<DocumentationPage />} />
        <Route path="/auth" element={<Auth greeting={<Greeting />} />} />
        <Route path="/guest" element={<GuestView />} />
        <Route path="/whiteboards" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AuthContext>
);

