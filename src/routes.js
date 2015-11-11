import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import About from './components/About'
import PoweredBy from './components/Powered-by'
import Home from './components/Home'
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';

    
export default (
    <Route path="/" component={App}>
      <Route path="about" component={About}  />
      <Route path="poweredby" component={PoweredBy}/>
    </Route>
);

/*
export default {
  component: require('./components/App'),
  childRoutes: [
    { path: '/about',
      getComponent: (location, cb) => {
        cb(null, About);
      }
    },
    { path: '/poweredby',
      getComponent: (location, cb) => {
          cb(null, PoweredBy);
        
      }
    },
    { path: '/',
      getComponent: (location, cb) => {
        cb(null, Home);
        
      }
    }
  ]
}
*/
