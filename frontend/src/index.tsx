import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/common.css';
import './styles/main.css';
import './styles/responsive.css';
import './styles/custom.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);

