import { useEffect } from 'react'
import { Form, Input, Button, message, Flex, Typography } from 'antd'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import React from 'react'
const { Text } = Typography
import PropTypes from 'prop-types'

const boxStyle = {
  margin: '200px 0 0 0',
  width: '100%',
  height: 120,
}

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setIsAuthenticated(true)
      navigate('/todo')
    }
  }, [navigate, setIsAuthenticated])

  const onFinish = async values => {
    try {
      const response = await axios.post('http://localhost:4444/login', values)

      if (response.status === 200) {
        const { token, userData } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(userData))

        setIsAuthenticated(true)
        navigate('/todo')
      } else {
        message.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Error:', error)
      message.error('An error occurred while logging in. Please try again.')
    }
  }

  const validateEmail = (rule, value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!value || emailPattern.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject('Please enter a valid email address.')
  }

  const validatePassword = (rule, value) => {
    if (value && value.length >= 6) {
      return Promise.resolve()
    }
    return Promise.reject('Password must be at least 6 characters.')
  }

  LoginPage.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
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
                  {
                    validator: validateEmail,
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
                  {
                    validator: validatePassword,
                  },
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
