import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import ApiError from './utils/ApiError.js';

const app = express();

// Database connection ko yahan call karein
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});