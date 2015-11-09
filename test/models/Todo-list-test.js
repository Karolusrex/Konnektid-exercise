import { expect } from 'chai';
import TodoItem from '../../src/models/Todo-item';
import TodoList from '../../src/models/Todo-list';
import {dbURI} from '../../src/config';
import mongoose from 'mongoose';
import clearDbModule from 'mocha-mongoose'

const clearDb = clearDbModule(dbURI);
    
describe('Todo item', () => {
    beforeEach((done) => {
        if (mongoose.connection.db)
            return done();
        mongoose.connect(dbURI, done);
  });
    let mockupTodoItems = (cb) => {
        new TodoItem({
              text       : "do this and that"
        }).save((error,firstModel) => {
                expect(error).to.be.null;
                new TodoItem({
                      text       : "do this as well"
                }).save((error,secondModel) => {
                        cb(error,[firstModel,secondModel]);
                });
            });
    };
    
    let saveTodoList = (cb) => {
        mockupTodoItems( (error,todoItems) => {
            expect(error).to.be.null;
            let todoListStruct = {items: todoItems.map((item) => item._id)}
            new TodoList(todoListStruct).save((error,model) => {
                expect(error).to.be.null;
                done(error,model);
            });
        });
    };
    it('can be saved', (done) => {
        saveTodoList(done);
    });
    
    it('should delete items on cascade', (done) => {
        saveTodoList((errorAlwaysNull,model) => {
            TodoList.find({id:model._id}).remove((error) => {
                expect(error).to.be.null;
                TodoItem.find({},(error,results) => {
                    expect(error).to.be.null;
                    expect(results.lenght).to.be.equal.to(0);
                    done();
                });
            });
        });
    });

});
