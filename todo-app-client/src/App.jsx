// App.jsx
import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { HomePage } from './pages/Homepage'
import { LoginPage } from './pages/Loginpage'
import { RegisterPage } from './pages/Registerpage'
import { NotFoundPage } from './pages/Notfoundpage'
import { TodoPage } from './pages/TodoPage/Todopage'
import AppHeader from './components/Header/Header'
import ProfilePage from './pages/Profilepage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
  }

  return (
    <>
      <AppHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/todo"
          element={
            isAuthenticated ? (
              <TodoPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
