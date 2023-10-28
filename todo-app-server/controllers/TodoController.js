import Todo from '../models/Todo.js'
import User from '../models/User.js'

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body
    const userId = req.userData.userId

    const user = await User.findById(userId).populate('todos')

    if (user.todos.length >= process.env.MAX_TODO_COUNT) {
      return res.status(400).json({
        message: 'Превышено максимальное количество задач',
      })
    }

    const todo = new Todo({
      title,
      description,
      user: userId,
      completed: false, // Устанавливаем состояние выполнения в false
    })

    await todo.save()

    user.todos.push(todo)
    await user.save()

    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось создать задачу',
    })
  }
}

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userData.userId })
    res.json(todos)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get todos',
    })
  }
}

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id
    const userId = req.userData.userId

    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed, // Состояние выполнения задачи
    }

    const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
      runValidators: true,
    })

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      })
    }

    res.json({
      success: true,
      todo,
    })
  } catch (err) {
    console.error('Error updating todo:', err)
    res.status(500).json({
      message: 'Failed to update todo',
    })
  }
}

export const removeTodo = async (req, res) => {
  try {
    const todoId = req.params.id

    const result = await Todo.findOneAndDelete({
      _id: todoId,
      user: req.userData.userId,
    })

    if (!result) {
      return res.status(404).json({
        message: 'Todo not found',
      })
    }

    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to delete todo',
    })
  }
}
