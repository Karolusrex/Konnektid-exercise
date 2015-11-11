import mongoose, {connection} from 'mongoose';


let TodoItem = mongoose.model('Todo-item');

// Create a new schema for our tweet data
let schema = new mongoose.Schema({
  items       : {type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Todo-item'}], default:[]},
    text   : {type:String, required:true},
    date       : {type: Date, default: Date.now}
}, {strict:"throw"});

//Delete items on cascade
schema.pre('remove', function(next) {
    TodoItem.remove({_id: { $in: this.items}}).exec();
    next();
});

let todoList = mongoose.model('Todo-list', schema);

//export default todoList;
