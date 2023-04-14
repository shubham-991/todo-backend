const express = require('express');
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.get('/:id', authMiddleware, getTodoById);
router.put('/:id', authMiddleware, updateTodoById);
router.delete('/:id', authMiddleware, deleteTodoById);

module.exports = router;
