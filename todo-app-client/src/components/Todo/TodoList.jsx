import React from 'react'
import Todo from './Todo'
import styles from './Todo.module.css'

const TodoList = ({ todos, onDelete, onUpdate, onToggleDone }) => {
  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <div key={todo._id} className={styles.todoItem}>
          <Todo
            todo={todo}
            onDelete={() => onDelete(todo._id)}
            onUpdate={(title, description) =>
              onUpdate(todo._id, title, description)
            }
            onToggleDone={() => onToggleDone(todo._id, !todo.done)} // Изменяем статус "Done" на противоположный
          />
        </div>
      ))}
    </div>
  )
}

export default TodoList
