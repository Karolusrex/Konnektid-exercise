import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import About from './components/About'
import PoweredBy from './components/Powered-by'
import Home from './components/Home'

export default (
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
        <Route path="home" component={Home}/>
      <Route path="poweredby" component={PoweredBy}/>
    </Route>
);
