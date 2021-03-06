import mongoose from 'mongoose';
import './models';

export function addTodoList(req,res)  {
    let TodoList = mongoose.model('Todo-list');
    //console.log(req.body);
    new TodoList(req.body).save((error,model) => {
        res.send(model);
    });
}

export function modifyTodo(req,res) {
    let TodoItem = mongoose.model('Todo-item');
    TodoItem.findByIdAndUpdate(
        req.body._id,
        {$set: req.body},
        {upsert:true, new:true},
        function(err,model){
            //console.log(model);
            if(!err){
                res.send(model);
            } else {
                console.log(err);
            }
        });
};

export function addTodo(req,res)  {
    let TodoItem = mongoose.model('Todo-item');
    let TodoList = mongoose.model('Todo-list');

    new TodoItem(req.body).save((error,todoItemModel) => {
        TodoList.findByIdAndUpdate(
            req.body.listId,
            {$push: {"items":  todoItemModel._id}},
            function(err, model) {
                if(!err){
                    res.send(todoItemModel);
                } else {
                    console.log(err);
                }
            }
        );
    });
}
    
export function deleteTodo(req,res)  {
    let TodoItem = mongoose.model('Todo-item');
    let TodoList = mongoose.model('Todo-list');
    new TodoItem(req.body).remove((error,todoItemModel) => {
        TodoList.findByIdAndUpdate(
            req.body.listId,
            { $pullAll: {items: [todoItemModel._id] } },
            function(err, model) {
                if(!err){
                    res.send(todoItemModel);
                } else {
                    console.log(err);
                }
            }
        );
    });
}

    
export function deleteTodoList(req,res)  {
    let TodoList = mongoose.model('Todo-list');
    new TodoList(req.body).remove((error,report) => {
        if(!error){
            res.send({status:"ok", report});
        } else {
            res.send({status:"error", error});
        }
    });
}
