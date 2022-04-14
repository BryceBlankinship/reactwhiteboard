import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import Button from './components/Buttons.jsx';
import WhiteboardView from './components/Whiteboard.jsx';
import DocumentationPage from './docs';
import Auth from './components/Auth.jsx';

import { Signup, Signin } from './components/Auth';
import GuestView from './components/Guest';
import Whiteboard from './components/Whiteboard.jsx';

export default function App() {
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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
    return(
      <HomeView authenticated={authenticated} onClick={createWhiteboard}/>
    );
  }

}

function HomeView(props){
  if(props.authenticated){
    return(
      <>
        <Greeting />
      </>
    );
  }else{
    return(
      <>
        <div className="header">
          <h1>React Whiteboard</h1>
          <p>A React Component Whiteboarding Tool<br></br>for Developer &#38; Designer Teams.</p>
        </div>

        <Auth greeting={<Greeting/>}/>
      </>
    );
  }
}

function Greeting(){
  let greetingText;
  const date = new Date();
  let h = date.getHours();
  
  if(h > 0 && h <= 12){
    greetingText = 'Good morning';
  }else if(h > 12 && h <= 18){
    greetingText = 'Good afternoon';
  }else if(h > 18 && h <= 24){
    greetingText = 'Good evening';
  }

  return(
    <div className="greeting-header">
      {greetingText}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/api" element={<DocumentationPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/guest" element={<GuestView/>}/>
      </Routes>
    </BrowserRouter>
);

