import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import PoweredBy from './components/Powered-by';
import About from './components/About';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import { Provider } from 'react-redux'
    import reducers from './reducers'
        import { fromJS } from 'immutable';
import { createStore } from 'redux';
import $ from 'jquery';



window.React = React;

let initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

const store = createStore(reducers, initialState);

let history = createHistory();



ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>

    {routes}

    </Router>
    </Provider>,


    document.getElementById('react-app')
);




$(document).scroll(function(){
    $('.filter-container').css('position','');
    var offsetTop = $('.filter-container').offset().top;

    $('.filter-container').css('position','absolute');   $('.filter-container').css('top',Math.max(offsetTop,$(document).scrollTop()));
});

