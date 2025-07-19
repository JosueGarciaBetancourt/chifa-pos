import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        {/* <ErrorBoundary> */}
          <App />
        {/* </ErrorBoundary> */}
      </BrowserRouter>
    </StrictMode>
  );
} catch (err) {
  console.error('[REACT] Error al montar la app:', err);
}


