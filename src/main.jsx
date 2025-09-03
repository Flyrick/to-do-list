import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Assuming App.jsx is in the same directory

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
