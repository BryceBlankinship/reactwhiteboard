import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Card from './Cards.jsx';

export default function App(){
  return(
    <>
      <h1>React Whiteboard</h1>
      <p>A React Component visualization tool for hybrid developer/designer teams.</p>

      <h1><a href='' onClick={(e) => {
        console.log('clicked');
        e.preventDefault();
      }}>Create new whiteboard</a></h1>

    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

