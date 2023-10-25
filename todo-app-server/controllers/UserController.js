import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import * as dotenv from "dotenv";
dotenv.config();

//register 
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // generation JWT-token
    const token = jwt.sign({ userId: user._id, email: user.email }, 'does', { expiresIn: '30d' });

    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};
