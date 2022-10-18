import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/userRouter.js';
import noteRouter from './routes/noteRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/api/notes', noteRouter);

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

// Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
