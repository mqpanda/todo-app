import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Flex, Typography } from 'antd'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const { Text } = Typography

const boxStyle = {
  margin: '200px 0 0 0',
  width: '100%',
  height: 120,
}

const LoginPage = ({ setIsAuthenticated, token }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setIsAuthenticated(true)
      navigate('/todo')
    }
  }, [])

  const onFinish = async values => {
    try {
      const response = await axios.post('http://localhost:4444/login', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        setIsAuthenticated(true)
        localStorage.setItem('token', token)
        navigate('/todo')
      } else {
        message.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Error:', error)
      message.error('An error occurred while logging in. Please try again.')
    }
  }

  return (
    <div>
      <Flex gap="middle" align="start" vertical>
        <Flex style={boxStyle} justify={'center'} align={'center'}>
          <div>
            <Flex style={boxStyle} justify={'space-between'} align={'center'}>
              <h2>Sign In</h2>
              <Link to="/register">
                <Text type="secondary">Sign up</Text>
              </Link>
            </Flex>
            <Form name="loginForm" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
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
                ]}
                className="custom-form-item"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export { LoginPage }
