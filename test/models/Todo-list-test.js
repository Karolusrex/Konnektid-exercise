import { expect } from 'chai';
import  '../../src/models';
import {dbURI} from '../../src/config';
import mongoose from 'mongoose';
import clearDbModule from 'mocha-mongoose'
import '../../src/models';

const clearDb = clearDbModule(dbURI);


let saveTodoItems = (TodoItem,cb) => {

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

let saveTodoList = (TodoItem,TodoList,cb) => {
    saveTodoItems(TodoItem, (error,todoItems) => {
        expect(error).to.be.null;
        let generatedId = mongoose.Types.ObjectId();
        let todoListStruct = {
            text: "what we have to do today",
            items: todoItems.map((item) => item._id),
            _id: generatedId}
        new TodoList(todoListStruct).save((error,model) => {
            expect(error).to.be.null;
            expect(model._id).to.be.equal(generatedId);
            cb(error,model);
        });
    });
};

describe('Todo item', () => {

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


    it('can be saved', function(done) {
        saveTodoList(this.TodoItem,this.TodoList,done);
    });
     it('can be retreived', function(done) {
        saveTodoList(this.TodoItem,this.TodoList,(errorAlwaysNull,model) => {
            this.TodoList.find({},(error,results) => {
                expect(results.length).to.be.equal(1);
                done();
            });
        });
    });

    it('should delete items on cascade', function(done) {

        saveTodoList(this.TodoItem,this.TodoList,(errorAlwaysNull,model) => {
            model.remove((error,nRemoved) => {
                expect(error).to.be.null;
                this.TodoItem.find({},(error,results) => {
                    expect(error).to.be.null;
                    expect(results.length).to.be.equal(0);
                    done();
                });
            });
        });
    });

});

export default {saveTodoItems,saveTodoList};

