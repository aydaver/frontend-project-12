import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../common/store/index.js';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const main = () => (
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
);

export default main;
