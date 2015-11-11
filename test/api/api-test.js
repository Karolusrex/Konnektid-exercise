import React from 'react/addons';
import http from 'http';
import { expect, assert } from 'chai';
import About from '../../src/components/About';
import server from '../../src/server';
import config from '../../src/config';
import errorCode  from 'rest/interceptor/errorCode';
import pathPrefix from 'rest/interceptor/pathPrefix';
import {Client} from 'node-rest-client';
import request from 'request-json';
import mongoose from 'mongoose';
import should from 'should';



describe('API', function() {
    before(function(done){
        server((server) => {
            this.server = server;
            this.TodoList = mongoose.model('Todo-list');
            this.TodoItem = mongoose.model('Todo-item');
            this.client = request.createClient('http://localhost:' + config.port + '/');
            
            this.saveTodoList = function(cb) {
                this.client.post('/addTodoList',{text:"shopping list"},(err,res,body) => {
                    expect(err).to.be.null;
                    expect(body.text).to.be.equal('shopping list');
                    expect(body._id).to.not.be.undefined;
                    cb(err,body);
                });
            };
            done();
        });
    });
    
    it('can change the info of a todo', function(done) {
        this.saveTodoList((errorAlwaysNull,todoListReply) => {
            this.client.post('/addTodo',{text:"do this and that",listId:todoListReply._id},(err,res,todoReply) => {
                expect(err).to.be.null;
                expect(todoReply.completed).to.be.false;
                todoReply.completed=true;
                todoReply.text="do this and that and that too";
                this.client.post('/modifyTodo',todoReply,(err,res,todoReply2) => {
                    expect(err).to.be.nulll;
                    expect(todoReply2.text).to.equal(todoReply.text);
                    expect(todoReply2.completed).to.be.true;
                    done();
                });
            });
        });
    });
    
it('should respond with added todo when querying /addTodo and the item should be consistent in the database with the Todolist', function(done) {
    this.saveTodoList((errorAlwaysNull,todoListReply) => {
        this.client.post('/addTodo',{text:"do this and that",listId:todoListReply._id},(err,res,todoReply) => {
            expect(err).to.be.null;
            expect(todoReply.text).to.be.equal('do this and that');
            expect(todoReply._id).to.not.be.undefined;
            this.TodoList.findOne({_id: todoListReply._id},(error,result) => {
                expect(error).to.be.null;
                
                expect(result.items).to.include(todoReply._id);
                todoReply.listId = todoListReply._id;
                this.client.post("/deleteTodo",todoReply,(error,result) => {
                    expect(error).to.be.null;
                    this.TodoList.findOne({_id: todoListReply._id},(error,result) => {
                        expect(result.items).not.to.include(todoReply._id);
                        done();
                    });
                });
            });
        });
    });
});

  it('should respond with added todolist when querying /addTodoList and the item should be in the database', function(done) {
      this.saveTodoList((errorAlwaysNull,body) => {
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
        this.saveTodoList((errorAlwaysNull,body) => {
            this.client.post('/deleteTodoList',body,(err,res,body) => {
                expect(body.status).to.equal("ok");
                this.TodoList.find({},(error,results) => {
                    expect(results.length).to.equal(0);
                    done();
                });
            });
        });
    });

});
