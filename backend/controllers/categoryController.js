// backend/controllers/categoryController.js

import { Category } from '../models/Category.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// --- CREATE ---
const createCategory = asyncHandler(async (req, res) => {
  // 1. Form se 'description' bhi lein
  const { name, description } = req.body; 
  
  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }
  

  const category = await Category.create({ name, description }); 
  
  return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

// --- GET ---
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

// --- UPDATE ---
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // 1. Form se 'description' bhi lein
    const { name, description } = req.body; 
   
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
});

// --- DELETE ---
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Category deleted successfully"));
});

export { createCategory, getCategories, updateCategory, deleteCategory };