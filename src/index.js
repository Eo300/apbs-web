import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import BasicExample from './router.js'
// import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<BasicExample />, document.getElementById('root'));

registerServiceWorker();
