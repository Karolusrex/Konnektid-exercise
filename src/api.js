import mongoose from 'mongoose';
import './models';

export function addTodoList(req,res)  {
    let TodoList = mongoose.model('Todo-list');
    new TodoList(req.body).save((error,model) => {
        res.send(model);
       
    });
    
}
