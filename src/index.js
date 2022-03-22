import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';

// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

ReactDOM.render(
    <HelmetProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </HelmetProvider>,
    document.getElementById('root')
);

reportWebVitals();