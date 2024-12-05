import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import App from './App.jsx';
import './index.css';
import store from './redux/store'; // Import your Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your app with the Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);