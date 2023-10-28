import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  List,
  Typography,
  Card,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
} from 'antd'

const { Title, Text } = Typography
const { TextArea } = Input

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editTodo, setEditTodo] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get('http://localhost:4444/todos', config)
      .then(response => {
        setTodos(response.data)
      })
      .catch(error => {
        console.error('Failed to fetch todos:', error)
      })
  }, [])

  const handleCompleteTodo = todoId => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const updatedTodo = {
      completed: true,
    }

    axios
      .put(`http://localhost:4444/todos/${todoId}`, updatedTodo, config)
      .then(() => {
        setTodos(prevTodos => {
          const updatedTodos = prevTodos.map(todo => {
            if (todo._id === todoId) {
              return { ...todo, completed: true }
            }
            return todo
          })
          return updatedTodos
        })
      })
      .catch(error => {
        console.error('Failed to complete todo:', error)
      })
  }

  const handleUncompleteTodo = todoId => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const updatedTodo = {
      completed: false,
    }

    axios
      .put(`http://localhost:4444/todos/${todoId}`, updatedTodo, config)
      .then(() => {
        setTodos(prevTodos => {
          const updatedTodos = prevTodos.map(todo => {
            if (todo._id === todoId) {
              return { ...todo, completed: false }
            }
            return todo
          })
          return updatedTodos
        })
      })
      .catch(error => {
        console.error('Failed to uncomplete todo:', error)
      })
  }

  const handleDeleteTodo = todoId => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .delete(`http://localhost:4444/todos/${todoId}`, config)
      .then(() => {
        setTodos(prevTodos => {
          const updatedTodos = prevTodos.filter(item => item._id !== todoId)
          return updatedTodos
        })
        message.success('The task was successfully deleted')
      })
      .catch(error => {
        console.error('Failed to delete todo:', error)
        message.error('Failed to delete todo')
      })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()

      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const newTodo = {
        title: values.title,
        description: values.description,
      }

      axios
        .post('http://localhost:4444/todos', newTodo, config)
        .then(response => {
          setTodos([...todos, response.data])
          message.success('Todo created successfully')
        })
        .catch(error => {
          console.error('Failed to create todo:', error)
          message.error('Failed to create todo')
        })
    } catch (errorInfo) {
      console.error('Failed:', errorInfo)
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleEdit = async () => {
    try {
      const values = await form.validateFields()

      const updatedTodo = {
        title: values.title,
        description: values.description,
      }

      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      axios
        .put(`http://localhost:4444/todos/${editTodo._id}`, updatedTodo, config)
        .then(() => {
          setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo => {
              if (todo._id === editTodo._id) {
                return {
                  ...todo,
                  title: values.title,
                  description: values.description,
                }
              }
              return todo
            })
            return updatedTodos
          })

          setEditTodo(null)
        })
        .catch(error => {
          console.error('Failed to edit todo:', error)
        })
    } catch (errorInfo) {
      console.error('Failed:', errorInfo)
    }
  }

  const handleCancelEdit = () => {
    setEditTodo(null)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>TODO List</Title>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: '16px' }}
      >
        Create todo
      </Button>

      <Modal
        title="Create todo"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="createTodoForm">
          <Form.Item
            name="title"
            label="title"
            rules={[{ required: true, message: 'Enter title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            rules={[{ required: true, message: 'Enter title' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit todo"
        open={editTodo !== null}
        onOk={handleEdit}
        onCancel={handleCancelEdit}
      >
        <Form form={form} name="editTodoForm">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Enter title' }]}
            initialValue={editTodo ? editTodo.title : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            initialValue={editTodo ? editTodo.description : ''}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={todos}
        renderItem={todo => (
          <List.Item>
            <Card
              title={todo.title}
              style={{ textAlign: 'center' }} // Центрируем контент внутри карточки
            >
              <Text style={{ textAlign: 'center' }}>{todo.description}</Text>{' '}
              {/* Центрируем текст внутри карточки */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {editTodo === todo ? (
                  <Button type="primary" onClick={handleEdit}>
                    Save
                  </Button>
                ) : (
                  <Button
                    type="danger"
                    onClick={() =>
                      editTodo === todo ? handleEdit : setEditTodo(todo)
                    }
                  >
                    {editTodo === todo ? 'Save' : 'Edit'}
                  </Button>
                )}

                <Popconfirm
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => handleDeleteTodo(todo._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
                <Button
                  type="primary"
                  onClick={() =>
                    todo.completed
                      ? handleUncompleteTodo(todo._id)
                      : handleCompleteTodo(todo._id)
                  }
                >
                  {todo.completed ? 'Undone' : 'Done'}
                </Button>
              </div>
              <Text type={todo.completed ? 'success' : 'danger'}>
                {todo.completed ? 'Completed: Yes' : 'Completed: No'}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export { TodoPage }
