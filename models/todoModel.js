// User Model
const mongoose = require('mongoose');

const { Schema } = mongoose;
// Todo Model
const todoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  isCompleted : {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
