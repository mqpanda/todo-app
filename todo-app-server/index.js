import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { registerUser, loginUser } from './controllers/UserController.js';


dotenv.config();

const app = express();

//DB connection 
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('DB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/register', registerUser); 
app.post('/login', loginUser); 

// Starting server
const PORT = process.env.PORT || 7000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${PORT}`);
});
