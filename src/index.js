import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './components/router';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppRouter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
