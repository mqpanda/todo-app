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
  const [form] = Form.useForm()

  useEffect(() => {
    // Получите токен из локального хранилища
    const token = localStorage.getItem('token')

    // Подготовьте конфигурацию для запроса, включая заголовок "Authorization"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    // Запрос к бэкенду для получения задач
    axios
      .get('http://localhost:4444/todos', config) // Замените на правильный URL для вашего бэкенда
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

    // Include the `completed` field in the request payload
    const updatedTodo = {
      completed: true,
    }

    axios
      .put(`http://localhost:4444/todos/${todoId}`, updatedTodo, config)
      .then(() => {
        // Update the local state
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

    // Include the `completed` field in the request payload
    const updatedTodo = {
      completed: false,
    }

    axios
      .put(`http://localhost:4444/todos/${todoId}`, updatedTodo, config)
      .then(() => {
        // Update the local state
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
    // Получите токен из локального хранилища
    const token = localStorage.getItem('token')

    // Подготовьте конфигурацию для запроса, включая заголовок "Authorization" с токеном
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    // Отправка DELETE-запроса на сервер для удаления задачи
    axios
      .delete(`http://localhost:4444/todos/${todoId}`, config) // Замените на правильный URL для вашего бэкенда
      .then(() => {
        // Удалите задачу из списка после успешного удаления
        setTodos(prevTodos => {
          const updatedTodos = prevTodos.filter(item => item._id !== todoId)
          return updatedTodos
        })
        message.success('Задача успешно удалена')
      })
      .catch(error => {
        console.error('Failed to delete todo:', error)
        message.error('Не удалось удалить задачу')
      })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      // Получите токен из локального хранилища
      const token = localStorage.getItem('token')

      // Подготовьте конфигурацию для запроса, включая заголовок "Authorization" с токеном
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const newTodo = {
        title: values.title,
        description: values.description,
      }

      // Отправка POST-запроса на сервер для создания задачи
      axios
        .post('http://localhost:4444/todos', newTodo, config) // Замените на правильный URL для вашего бэкенда
        .then(response => {
          // Добавьте созданную задачу к списку задач
          setTodos([...todos, response.data])
          message.success('Задача успешно создана')
        })
        .catch(error => {
          console.error('Failed to create todo:', error)
          message.error('Не удалось создать задачу')
        })
    } catch (errorInfo) {
      console.error('Failed:', errorInfo)
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Список задач</Title>
      <Button type="primary" onClick={showModal}>
        Создать задачу
      </Button>
      <Modal
        title="Создать задачу"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="createTodoForm">
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[{ required: true, message: 'Введите заголовок' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Введите описание' }]}
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
            <Card title={todo.title} style={{}}>
              <Text>{todo.description}</Text>
              <div
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ marginTop: 'auto' }}>
                  <Popconfirm
                    title="Вы уверены, что хотите удалить эту задачу?"
                    onConfirm={() => handleDeleteTodo(todo._id)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button type="danger">Удалить</Button>
                  </Popconfirm>
                  <Text type={todo.completed ? 'success' : 'danger'}>
                    {todo.completed ? 'Завершено: Да' : 'Завершено: Нет'}
                  </Text>
                  <Button
                    type="primary"
                    onClick={() =>
                      todo.completed
                        ? handleUncompleteTodo(todo._id)
                        : handleCompleteTodo(todo._id)
                    }
                  >
                    {todo.completed ? 'Отменить' : 'Завершить'}
                  </Button>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export { TodoPage }
