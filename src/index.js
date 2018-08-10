import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ServerRouter from './router.js'
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ServerRouter />, document.getElementById('root'));

registerServiceWorker();
