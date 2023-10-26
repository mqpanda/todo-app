import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, Flex } from 'antd'
import axios from 'axios'
import TodoList from '../../components/Todo/TodoList'
import { useNavigate } from 'react-router-dom'
import styles from './Todopage.module.css'

const TodoPage = ({ setIsAuthenticated }) => {
  const [todos, setTodos] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      navigate('/login')
    } else {
      axios
        .get('http://localhost:4444/todos', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          setTodos(response.data)
        })
        .catch(error => {
          console.error('Error fetching todos:', error)
        })
    }
  }, [navigate])

  const handleShowModal = () => {
    setIsModalVisible(true)
  }

  const handleHideModal = () => {
    setIsModalVisible(false)
  }

  const handleCreateTodo = values => {
    const storedToken = localStorage.getItem('token')
    axios
      .post('http://localhost:4444/todos', values, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        setTodos([...todos, response.data])
        handleHideModal()
      })
      .catch(error => {
        console.error('Error creating todo:', error)
      })
  }

  const handleUpdateTodo = (todoId, title, description) => {
    const storedToken = localStorage.getItem('token')
    axios
      .put(
        `http://localhost:4444/todos/${todoId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )
      .then(response => {
        setTodos(prevTodos => {
          return prevTodos.map(todo =>
            todo._id === todoId ? { ...todo, title, description } : todo,
          )
        })
      })
      .catch(error => {
        console.error('Error updating todo:', error)
      })
  }

  const handleDeleteTodo = todoId => {
    const storedToken = localStorage.getItem('token')
    axios
      .delete(`http://localhost:4444/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
      })
      .catch(error => {
        console.error('Error deleting todo:', error)
      })
  }

  const handleToggleDone = (todoId, isDone) => {
    const storedToken = localStorage.getItem('token')
    axios
      .put(
        `http://localhost:4444/todos/${todoId}`,
        { done: isDone },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )
      .then(response => {
        setTodos(prevTodos => {
          return prevTodos.map(todo =>
            todo._id === todoId ? { ...todo, done: isDone } : todo,
          )
        })
      })
      .catch(error => {
        console.error('Error updating todo:', error)
      })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <h2>Todo Page</h2>

      <Flex justify={'center'} align={'center'}>
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
          onToggleDone={handleToggleDone}
        />

        <Modal
          title="Create New Todo"
          open={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleHideModal}
        >
          <Form form={form} onFinish={handleCreateTodo}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
      <Flex justify="center">
        <Button className="create" type="primary" onClick={handleShowModal}>
          Create New Todo
        </Button>
      </Flex>
    </div>
  )
}

export { TodoPage }
