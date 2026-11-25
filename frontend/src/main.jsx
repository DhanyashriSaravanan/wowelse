/**
 * src/main.jsx — Entry point for the React app.
 *
 * WHY: This is the first file that runs. It mounts the React app
 * into the <div id="root"> in index.html.
 *
 * HOW: BrowserRouter wraps the entire app so React Router can handle
 * page navigation without full page reloads.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
