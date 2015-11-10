import React from 'react/addons';
import http from 'http';
import { expect, assert } from 'chai';
import About from '../../src/components/About';
import server from '../../src/server';
import config from '../../src/config';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode  from 'rest/interceptor/errorCode';
import pathPrefix from 'rest/interceptor/pathPrefix';
import {Client} from 'node-rest-client';
import request from 'request-json';
import mongoose from 'mongoose';
import should from 'should';

let client = rest.wrap(mime)
    .wrap(pathPrefix, { prefix: 'http://localhost' });

describe('API', () => {
    before(function(done){
        server((server) => {
            this.server = server;
            
            this.TodoList = mongoose.model('Todo-list');
            this.TodoItem = mongoose.model('Todo-item');
            this.client = request.createClient('http://localhost:' + config.port + '/');
            done();
        });
    });

    
  it('should respond with added todolist when querying /addTodoList and the item should be in the database', function(done) {
      
      this.client.post('/addTodoList',{text:"shopping list"},(err,res,body) => {
         expect(err).to.be.null;
          expect(body.text).to.be.equal('shopping list');
          expect(body._id).to.not.be.undefined;
          this.TodoList.find({},(error,results) => {
              //get the latest result
              let todoList = results.slice(-1)[0];
              for(let property in body){
                  let attribute = todoList[property];
                  if(typeof attribute == 'object'){
                      if(attribute instanceof Date){
                          attribute = attribute.toISOString();
                      } else if (Array.isArray(attribute) && attribute.length==0) {
                          attribute=[];
                      } else {
                        attribute = attribute.toString();
                      }
                  }
                  //this test requires a special function, apparently
                  should(body[property]).eql(attribute);
              }
              done();
          });
      });
  });
    
    it('should be able to add a todolist, then delete it',function(done){
        this.client.post('/addTodoList',{text:"shopping list"},(err,res,body) => {
            expect(err).to.be.null;
            expect(body.text).to.be.equal('shopping list');
            expect(body._id).to.not.be.undefined;
            this.client.post('/removeTodoList',body,(err,res,body) => {
                expect(body.status).to.equal("ok");
            });
        });
    });

});
