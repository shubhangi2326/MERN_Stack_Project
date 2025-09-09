// config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // MongoDB se connect karein
    await mongoose.connect(process.env.MONGODB_URI); 
     
    console.log(`MongoDB Connected`);

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;