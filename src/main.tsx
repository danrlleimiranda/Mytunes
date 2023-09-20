import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <HashRouter basename="/">
    <App />
  </HashRouter>
  ,
);
