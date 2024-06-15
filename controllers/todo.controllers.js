import Todo from "../models/todo.schema.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res
        .status(404)
        .json({ success: false, error: "Todo is required." });

    const isTodoExist = await Todo.findOne({ text, isDeleted: false });
    if (isTodoExist) {
      return res
        .status(404)
        .json({ success: false, error: "Todo is already exists." });
    }

    const newTodo = new Todo({
      text,
    });
    await newTodo.save();
    const allTodos = await Todo.find({ isDeleted: false });
    return res.status(201).json({
      success: true,
      allTodos: allTodos,
      message: "Todo created successfully.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ success: false, error });
  }
};
export const editTodo = async (req, res) => {
  try {
    const { todoId, newTodoText } = req.body;
    if (!todoId || !newTodoText) {
      return res
        .status(404)
        .json({ success: false, error: "All fields are required." });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        text: newTodoText,
      },
      { new: true }
    );
    const allTodos = await Todo.find({ isDeleted: false });
    return res.status(200).json({
      success: true,
      allTodos,
      message: "Todo updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    if (!todoId) {
      return res
        .status(404)
        .json({ success: false, error: "Todo id is requried." });
    }
    await Todo.findByIdAndUpdate(todoId, { isDeleted: true });
    const allTodos = await Todo.find({ isDeleted: false });
    return res
      .status(200)
      .json({ success: true, allTodos, message: "Todo deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ isDeleted: false });
    return res.status(200).json({ success: true, todos });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
