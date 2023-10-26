import React from 'react'
import { Card, Button, Modal, Form, Input } from 'antd'

const { Meta } = Card

const Todo = ({ todo, onDelete, onUpdate, onToggleDone }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [form] = Form.useForm()

  const handleDelete = () => {
    onDelete(todo._id)
  }

  const handleUpdate = () => {
    setIsModalVisible(true)
  }

  const handleUpdateSubmit = () => {
    form.validateFields().then(values => {
      onUpdate(todo._id, values.title, values.description)
      setIsModalVisible(false)
    })
  }

  return (
    <Card
      style={{
        width: 300,
        marginBottom: 16,
        backgroundColor: todo.done ? '#e1e1e1' : 'white',
      }}
      actions={[
        <Button type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button type="secondary" onClick={handleUpdate}>
          Update
        </Button>,
        <Button type="primary" onClick={() => onToggleDone(todo._id)}>
          {todo.done ? 'Undone' : 'Done'}
        </Button>,
      ]}
    >
      <Meta title={todo.title} description={todo.description} />
      <Modal
        title="Update Todo"
        open={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            label="Title"
            name="title"
            initialValue={todo.title}
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={todo.description}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default Todo
