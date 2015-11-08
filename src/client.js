import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import Todo from './components/Todo';
import PoweredBy from './components/Powered-by';
import About from './components/About';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

window.React = React;

let history = createHistory();

ReactDOM.render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('react-app')
);
