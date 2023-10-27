import React, { useState } from 'react'
import { Card, Button, Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const { Meta } = Card

const Todo = ({ todo, onDelete, onUpdate, onToggleDone }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [updatedTodo, setUpdatedTodo] = useState(todo)

  const handleDelete = () => {
    onDelete(todo._id)
  }

  const handleUpdate = () => {
    setIsModalVisible(true)
    form.setFieldsValue({
      title: updatedTodo.title,
      description: updatedTodo.description,
    })
  }

  const handleUpdateSubmit = values => {
    const updatedData = { ...updatedTodo, ...values }
    onUpdate(todo._id, updatedData)
    setIsModalVisible(false)
    setUpdatedTodo(updatedData)
  }

  return (
    <Card
      style={{
        width: 300,
        marginBottom: 16,
        backgroundColor: todo.done ? '#e1e1e1' : 'white',
      }}
      actions={[
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="update" type="danger" onClick={handleUpdate}>
          Update
        </Button>,
        <Button
          key="toggleDone"
          type="primary"
          onClick={() => onToggleDone(todo._id)}
        >
          {todo.done ? 'Undone' : 'Done'}
        </Button>,
      ]}
    >
      <Meta title={updatedTodo.title} description={updatedTodo.description} />
      <Modal
        title="Update Todo"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleUpdateSubmit}>
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
    </Card>
  )
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export default Todo
