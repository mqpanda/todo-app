import { Form, Input, Button, message, Flex, Typography } from 'antd'
import axios from 'axios'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const { Text } = Typography

const boxStyle = {
  margin: '200px 0 0 0',
  width: '100%',
  height: 120,
}

const RegisterPage = () => {
  const navigate = useNavigate()

  const onFinish = async values => {
    try {
      const response = await axios.post(
        'http://localhost:4444/register',
        values,
      )
      if (response.status === 201) {
        message.success('Registration successful. You can now sign in.')
        navigate('/login')
      } else {
        message.error('Registration failed. Please check your information.')
      }
    } catch (error) {
      message.error('An error occurred during registration. Please try again.')
    }
  }

  return (
    <Flex gap="middle" align="start" vertical>
      <Flex style={boxStyle} justify={'center'} align={'center'}>
        <div>
          <Flex style={boxStyle} justify={'space-between'} align={'center'}>
            <h2>Sign up</h2>
            <Link to="/login">
              <Text type="secondary">Sign In</Text>
            </Link>
          </Flex>
          <Form name="registerForm" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
                {
                  min: 3,
                  message: 'Username must be at least 3 characters.',
                },
              ]}
              className="custom-form-item"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
              ]}
              className="custom-form-item"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters.' },
              ]}
              className="custom-form-item"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </Flex>
  )
}

export { RegisterPage }
