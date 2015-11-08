import mongoose from 'mongoose';


// Create a new schema for our tweet data
let schema = new mongoose.Schema({
  text       : String,
  date       : {type: Date, default: Date.now},
  completed  : {type: Boolean, default: false}
});


// Return a Tweet model based upon the defined schema
export default mongoose.model('Todo-item', schema);
