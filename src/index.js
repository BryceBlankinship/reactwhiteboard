import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Card from './Cards.jsx';

export default function App(){
  return(
    <>
      <h1>React Whiteboard</h1>
      <p>What is react whiteboard? Good question! I don't really know yet.</p>
      
      <Card title="Drag Me!" desc="Please :)"></Card>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

