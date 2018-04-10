import React from 'react';
import ReactDOM from 'react-dom';
import Authors from './components/authors';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(<Authors />, document.getElementById('root'));
registerServiceWorker();
