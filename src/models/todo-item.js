import mongoose, {connection} from 'mongoose';

// Create a new schema for our tweet data
let schema = new mongoose.Schema({
  text       : String,
  date       : {type: Date, default: Date.now},
  completed  : {type: Boolean, default: false}
});

mongoose.model('Todo-item', schema);


//export default todoItem;
