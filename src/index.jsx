import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Card from './Cards.jsx';
import Button from './Buttons.jsx';
import WhiteboardView from './Whiteboard';

export default function HomeView(){
  const [whiteboardActive, setWhiteboardActive] = useState(false);

  const createWhiteboard = () => {
    setWhiteboardActive(true);
  }

  const removeWhiteboard = () => {
    setWhiteboardActive(false);
  }

  if(whiteboardActive){
    return(
      <>
        <Button type='text' title="Go back" onClick={removeWhiteboard} /> 
        <WhiteboardView/>
      </>
    );
  }else{
    return(
      <>
        <h1>React Whiteboard</h1>
        <p>A React Component visualization tool for hybrid developer/designer teams.</p>
  
        <Button type='text' title='Create a new whiteboard' fontSize='24px' onClick={createWhiteboard}/>
      </>
    );
  }

}

ReactDOM.render(
  <React.StrictMode>
    <HomeView/>
  </React.StrictMode>,
  document.getElementById('root')
);

