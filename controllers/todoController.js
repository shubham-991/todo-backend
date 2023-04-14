const Todo = require('../models/todoModel');
const asyncHandler = require('express-async-handler');

// @desc      Get all todos
// @route     GET /api/todos
// @access    Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// @desc      Get single todo
// @route     GET /api/todos/:id
// @access    Private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo && todo.user.toString() === req.user._id.toString()) {
    res.json(todo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

// @desc      Create todo
// @route     POST /api/todos
// @access    Private
const createTodo = asyncHandler(async (req, res) => {
  const { name, description, isCompleted } = req.body;
  const todo = new Todo({
    name,
    description,
    user: req.user._id,
    isCompleted: isCompleted || false,
  });
  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

// @desc      Update todo
// @route     PUT /api/todos/:id
// @access    Private

const updateTodoById = asyncHandler(async (req, res) => {
  const { name, description, isCompleted } = req.body;
  const todo = await Todo.findById(req.params.id);
  if (todo && todo.user.toString() === req.user._id.toString()) {
    todo.name = name || todo.name;
    todo.description = description || todo.description;
    todo.isCompleted = isCompleted || todo.isCompleted;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

// @desc      Delete todo
// @route     DELETE /api/todos/:id
// @access    Private
const deleteTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  if (todo.user.toString() === req.user._id.toString()) {
    await Todo.deleteOne({ _id: todo._id });
    res.json({ message: 'Todo removed' });
  } else {
    res.status(401);
    throw new Error('Not authorized to delete this todo');
  }
});



module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
