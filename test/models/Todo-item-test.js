import { expect } from 'chai';
import TodoItem from '../../src/models/Todo-item';
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

    it('can be saved', (done) => {
        let todoItem = new TodoItem({
              text       : "do this and that"
        }).save(done);
    });
        
    it('can be saved and retreived', (done) => {
        new TodoItem({
              text       : "do this and that"
        }).save((error,model) => {
                expect(error).to.be.null;
                new TodoItem({
                      text       : "do this as well"
                }).save((error,model) => {
                        expect(error).to.be.null;
                        TodoItem.find({},(error,results) => {
                            expect(error).to.be.null;
                            expect(results[0].text).to.equal("do this and that");
                            expect(results[1].text).to.equal("do this as well");
                            expect(results[0].date).to.be.a('date');
                            done();
                        });
                        
                });
            });
    });


});
