import React from 'react'
import Todo from './Todo'
import PropTypes from 'prop-types'
import styles from './Todo.module.css'

const TodoList = ({ todos, onDelete, onUpdate, onToggleDone }) => {
  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <div key={todo._id} className={styles.todoItem}>
          <Todo
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleDone={() => onToggleDone(todo._id, !todo.done)}
          />
        </div>
      ))}
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export default TodoList
