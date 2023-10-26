import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import * as dotenv from 'dotenv'
dotenv.config()

// register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
}

// login
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    // Generation of JWT-token with expiresIn from .env
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    )

    // Include user data in the response
    const userData = {
      userId: user._id,
      email: user.email,
      username: user.username,
    }

    res
      .status(200)
      .json({ message: 'Authentication successful', token, userData })
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
}

// get Current User
export const getCurrentUser = async (req, res) => {
  const userId = req.userData.userId

  try {
    const user = await User.findById(userId).exec()
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    //return info without password
    const { username, email } = user
    res.status(200).json({ username, email })
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user data' })
  }
}
