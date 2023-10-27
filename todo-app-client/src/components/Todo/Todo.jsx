import React, { useState } from 'react'
import { Card, Button, Modal, Form, Input } from 'antd'

const { Meta } = Card

// ...

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
    console.log('Todo prop:', todo)
    console.log('Form values:', values)

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
        backgroundColor: updatedTodo.done ? '#e1e1e1' : 'white',
      }}
      actions={[
        <Button type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button type="primary" onClick={() => onToggleDone(todo._id)}>
          {updatedTodo.done ? 'Undone' : 'Done'}
        </Button>,
        <Button type="default" onClick={handleUpdate}>
          Update
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
            name="title" // Specify the field name
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

export default Todo
