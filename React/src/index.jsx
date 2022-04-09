import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import Button from './Buttons.jsx';
import WhiteboardView from './Whiteboard';
import DocumentationPage from './docs';

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
        <Button type='text' title="Go back" onClick={removeWhiteboard} />
        <WhiteboardView />
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
        <h1>React Whiteboard</h1>
        <p>A React Component visualization tool for hybrid developer/designer teams.</p>
        <Link to="/api">api</Link>

        <Button type='text' title='Create a new whiteboard' fontSize='24px' onClick={props.onClick} />
      </>
    );
  }
}

function Greeting(){
  let greetingText;
  const date = new Date();
  let h = date.getHours();
  
  if(h > 0 && h <= 12){
    greetingText = 'Good morning'
  }else if(h > 12 && h <= 18){
    greetingText = 'Good afternoon'
  }else if(h > 18 && h <= 24){
    greetingText = 'Good evening'
  }

  return(
    <div className="greeting-header">
      {greetingText}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/api" element={<DocumentationPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

