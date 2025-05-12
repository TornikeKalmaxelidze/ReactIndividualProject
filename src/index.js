import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContextProvaider from './context/AppContextProvaider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvaider>
    <Router>
      <App />
    </Router>
  </AppContextProvaider>
);


