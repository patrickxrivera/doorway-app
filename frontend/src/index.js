import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setupSentry } from './setup/sentry';

setupSentry();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('__follow-gate-widget')
);
