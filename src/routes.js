import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import About from './components/About'
import Todo from './components/Todo'
import PoweredBy from './components/Powered-by'

export default (
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="todo" component={Todo}/>
      <Route path="poweredby" component={PoweredBy}/>
    </Route>
);
