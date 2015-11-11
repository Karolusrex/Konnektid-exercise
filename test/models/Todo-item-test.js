import { expect } from 'chai';
import  '../../src/models';
import {dbURI} from '../../src/config';
import mongoose from 'mongoose';
import clearDbModule from 'mocha-mongoose'

let TodoItem;
const clearDb = clearDbModule(dbURI);
    
describe('Todo item', () => {
    beforeEach(function (done){
        let initModel = () => {
            this.TodoItem = mongoose.model('Todo-item');
        }
        if (mongoose.connection.db){
            initModel();
            return done();
        }
        mongoose.connect(dbURI, (error,done) => {
            initModel();
            return done();
        });
  });

    it('can be saved', function(done) {
        let todoItem = new this.TodoItem({
              text       : "do this and that"
        }).save(done);
    });
        
    it('can be saved and retreived', function(done)  {
        new this.TodoItem({
              text       : "do this and that"
        }).save((error,model) => {
                expect(error).to.be.null;
                new this.TodoItem({
                      text       : "do this as well"
                }).save((error,model) => {
                        expect(error).to.be.null;
                        this.TodoItem.find({},(error,results) => {
                            expect(error).to.be.null;
                            expect(results.length).to.equal(2);
                            expect(results[0].text).to.equal("do this and that");
                            expect(results[1].text).to.equal("do this as well");
                            expect(results[0].date).to.be.a('date');
                            done();
                        });
                        
                });
            });
    });


});
