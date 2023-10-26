import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Layout, Menu, Button } from 'antd'
import styles from './header.module.css'

const { Header } = Layout

const AppHeader = ({ isAuthenticated, onLogout }) => {
  return (
    <Header>
      <Flex justify={'space-between'} align={'center'}>
        <Link to="/">
          <h1>TODO</h1>
        </Link>
        <Flex justify={'space-between'} align={'center'} gap={'20px'}>
          {isAuthenticated ? (
            <div>
              <Button type="primary" onClick={onLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button type="primary">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button block>Sign up</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Header>
  )
}

export default AppHeader
