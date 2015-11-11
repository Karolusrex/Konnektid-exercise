import path from 'path';
import express from 'express';
import http from 'http';
import async from 'async';
import exphbs from 'express-handlebars';
import routes from './routes';
import createLocation from 'history/lib/createLocation';
import Router, { match, RoutingContext } from 'react-router';
import React from 'react';
import {renderToString} from 'react-dom/server';
import mongoose from 'mongoose';
import config from './config';
import { createStore } from 'redux';
import todoApp from './reducers';
import { Provider } from 'react-redux';
import * as reduxAction from './actions';
import './models';
import * as api from './api';
import bodyParser from 'body-parser';

let port = config.port || 8080;



let app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('trust proxy', 'loopback');
app.set('x-powered-by', false);
app.set('view engine','handlebars');
 
//The target path is ../dist
let distDir = path.sep + path.join(...(__dirname.split(path.sep).slice(1,-1).concat(["dist"])));


//Server side rendering when handling routing
app.use((req, res) => {
  let location = createLocation(req.originalUrl);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation)
      res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
    else if (error)
      res.status(500).send(error.message)
    else if (renderProps == null)
      res.status(404).send('Not found')
    else {
        let TodoList = mongoose.model('Todo-list');
        let TodoItem = mongoose.model('Todo-item');
        TodoList.find({},(error,allTodoLists) => {
            TodoItem.find({},(error,allTodoItems) => {
                // Compile an initial state


                // Create a new Redux store instance
                let store = createStore(todoApp);
                //console.log(store);
                store.dispatch(reduxAction.addTodoLists(allTodoLists));
                store.dispatch(reduxAction.addTodos(allTodoItems));

                let markup = renderToString(<Provider store={store}><RoutingContext {...renderProps}/></Provider>);
                const finalState = store.getState();

                res.render('home',{markup:markup, state:JSON.stringify(finalState)});
            });
            
        });
    }
  });
});


let server, callback;
let router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use('/',express.static(distDir));
router.post('/addTodoList',api.addTodoList);
router.post('/deleteTodoList',api.deleteTodoList);
router.post('/addTodo',api.addTodo);
router.post('/deleteTodo',api.deleteTodo);
router.post('/modifyTodo',api.modifyTodo);
router.use('/*',app);

async.waterfall([
    (next) => { mongoose.connect(config.dbURI,next) },
    (next) => server = http.createServer(router).listen(port, function() {
            console.log('Server listening on port ' + port);
            if( typeof callback == 'function' ){
                callback(server);
            }
            next();
        })
]);



export default function(cb){
    if(typeof server != 'undefined'){
        cb(server);
    } else {
        callback = cb;
    }
}
