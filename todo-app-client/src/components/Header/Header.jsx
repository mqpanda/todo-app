import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Layout, Button } from 'antd'
const { Header } = Layout
import PropTypes from 'prop-types'
import './header.module.css'

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

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default AppHeader
