import mongoose from 'mongoose'

// Creating schema 4 mongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User
