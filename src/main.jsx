
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';  // Ensure App includes routing logic
import './index.css';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* This will render Login or other routes depending on routing */}
    </BrowserRouter>
  </StrictMode>
);