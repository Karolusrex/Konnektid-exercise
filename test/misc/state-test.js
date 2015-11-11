import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect, assert } from 'chai';
import App from '../../src/components/App';
import * as packageJSON from '../../package.json';
import todoApp from '../../src/reducers';
import '../../src/models';
import mongoose from 'mongoose';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import clearDbModule from 'mocha-mongoose'
import {saveTodoItems, saveTodoList} from '../models/Todo-list-test'
import {dbURI} from '../../src/config';
import * as reduxActions from '../../src/actions';

const clearDb = clearDbModule(dbURI);

let TodoItem;
let TodoList;

describe('State', () => {
     beforeEach(function (done){
            let initModels = () => {
                this.TodoList = mongoose.model('Todo-list');
                this.TodoItem = mongoose.model('Todo-item');
            }
            if (mongoose.connection.db){
                initModels();
                return done();
            }
            mongoose.connect(dbURI, (error,done) => {
                initModels();
                return done();
            });
      });
    
    it('should be able to store, complete, and remove todo lists', function(done) {
        let store = createStore(todoApp);
      new this.TodoItem({
              text       : "do this and that"
        }).save((error,first_model) => {
                store.dispatch(reduxActions.addTodo(first_model));
                expect(error).to.be.null;
                new this.TodoItem({
                      text       : "do this as well"
                }).save((error,second_model) => {
                        expect(error).to.be.null;
                        store.dispatch(reduxActions.addTodo(second_model));
                        let storedTodos = store.getState().todos;
                        expect(storedTodos[first_model._id].text).to.be.equal("do this and that");
                        expect(storedTodos[second_model._id].text).to.be.equal("do this as well");
                        //Complete one todo
                        expect(storedTodos[second_model._id].completed).to.be.false;
                        store.dispatch(reduxActions.completeTodo(second_model));
                        expect(storedTodos[second_model._id].completed).to.be.true;
                        expect(Object.keys(storedTodos).length).to.be.equal(2);
                        store.dispatch(reduxActions.deleteTodos([first_model,second_model]));
                        expect(Object.keys(store.getState().todos).length).to.be.equal(0);
                        done();
                });
      });
  });
    
    
  it('should be able to store and remove todo lists', function(done) {
      let store = createStore(todoApp);
      saveTodoList(this.TodoItem,this.TodoList,(errorAlwaysNull,model) => {
          saveTodoList(this.TodoItem,this.TodoList,(errorAlwaysNull,model) => {
              this.TodoList.find({},(error,result) => {
 store.dispatch(reduxActions.addTodoLists(result));
                  
                  for(let todoList of result){
                        expect(store.getState().todoLists[todoList._id]).to.be.deep.equal(todoList);
                  }
                  //Delete one todo list, so we should only have one left
                  store.dispatch(reduxActions.deleteTodoList(result[0]));
                    expect(Object.keys(store.getState().todoLists).length).to.be.equal(1);
                  done();
              });
          });
      });
  });
      
  it('should link and unlink todos from lists', function(done) {
      let store = createStore(todoApp);
      saveTodoList(this.TodoItem,this.TodoList,(errorAlwaysNull,todoList) => {
          saveTodoItems(this.TodoItem,(errorAlwaysNull,todoItems) => {
              let todoItem = todoItems[0];
              store.dispatch(reduxActions.addTodoList(todoList));
              store.dispatch(reduxActions.addTodo(todoItem));
              expect(store.getState().todoLists[todoList._id].items).to.not.include(todoItem._id);
              store.dispatch(reduxActions.linkTodo({todoId:todoItem._id,listId:todoList._id}));
              expect(store.getState().todoLists[todoList._id].items).to.include(todoItem._id);
              console.log(store.getState().todoLists[todoList._id].items);
              store.dispatch(reduxActions.unLinkTodo({todoId:todoItem._id,listId:todoList._id}));
              expect(store.getState().todoLists[todoList._id].items).to.not.include(todoItem._id);
              done();
          });
      });
  });
    


  


});
