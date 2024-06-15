import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  text: String,
  isDeleted: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
