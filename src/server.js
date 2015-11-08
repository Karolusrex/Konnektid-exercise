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
import {dbURI} from 'config';

let port = process.env.PORT || 8080;



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
        let markup = renderToString(<RoutingContext {...renderProps}/>);
        res.render('home',{markup:markup});    }
  });
});



let router = express();


router.use('/',express.static(distDir));
router.use('/*',app);

async.waterfall([
    (next) => { mongoose.connect(dbURI) },
    (next) => router.listen(port, function() {
        console.log('Server listening on port ' + port);
        next();
    })
]);
