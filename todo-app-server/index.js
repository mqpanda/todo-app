import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from './controllers/UserController.js'
import { checkAuth } from './middleware/authMiddleware.js'
import {
  createTodo,
  getAllTodos,
  updateTodo,
  removeTodo,
} from './controllers/TodoController.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
//DB connection
app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', error => {
  console.error('DB connection error:', error)
})

db.once('open', () => {
  console.log('Connected to MongoDB')
})

app.post('/register', registerUser)
app.post('/login', loginUser)
app.get('/profile', checkAuth, getCurrentUser)

app.get('/todos', checkAuth, getAllTodos)
app.post('/todos', checkAuth, createTodo)
app.put('/todos/:id', checkAuth, updateTodo)
app.delete('/todos/:id', checkAuth, removeTodo)

// Starting server
const PORT = process.env.PORT || 7000

app.listen(PORT, err => {
  if (err) {
    return console.log(err)
  }

  console.log(`Server started on port ${PORT}`)
})
