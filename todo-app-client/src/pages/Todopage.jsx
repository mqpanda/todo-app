import React from 'react'
import { useNavigate } from 'react-router-dom'

const TodoPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <h2>Todo Page</h2>
    </div>
  )
}

export { TodoPage }
