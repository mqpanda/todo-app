import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'

const { Text } = Typography

const ProfilePage = () => {
  // State variable to store the retrieved user data
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData)
      setUserData(parsedUserData)
    }
  }, [])

  return (
    <div>
      <h2>Your Profile</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>User data not found in localStorage.</p>
      )}
    </div>
  )
}

export default ProfilePage
