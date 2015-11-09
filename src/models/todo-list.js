import mongoose from 'mongoose';
import TodoItem from './Todo-item';

// Create a new schema for our tweet data
let schema = new mongoose.Schema({
  items       : [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo-item'}],
    date       : {type: Date, default: Date.now}
});

//Delete items on cascade
schema.pre('remove', function(next) {
    console.log("Revoming items");
    TodoItem.remove({_id: { $in: this.items}}).exec();
    next();
});

// Return a Tweet model based upon the defined schema
export default mongoose.model('Todo-list', schema);
