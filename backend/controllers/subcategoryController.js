// controllers/subcategory.controller.js

import { Subcategory } from '../models/Subcategory.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// --- CREATE a new Subcategory ---
export const createSubcategory = asyncHandler(async (req, res) => {
    const { name, description, category } = req.body;

    if (!name || !category) {
        throw new ApiError(400, "Name and parent category are required");
    }

    const subcategory = await Subcategory.create({ name, description, category });
    
    // Nayi subcategory ko populate karke bhejein, taaki frontend ko turant category ka naam mil jaaye
    const createdSubcategory = await Subcategory.findById(subcategory._id).populate('category', 'name');

    return res.status(201).json(new ApiResponse(201, createdSubcategory, "Subcategory created successfully"));
});

// --- GET all Subcategories ---
export const getSubcategories = asyncHandler(async (req, res) => {
    const subcategories = await Subcategory.find({}).populate('category', 'name').sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, subcategories, "All subcategories fetched"));
});

// --- GET Subcategories by Parent Category ID ---
export const getSubcategoriesByCategoryId = asyncHandler(async (req, res) => {
    const { catId } = req.params;
    const subcategories = await Subcategory.find({ category: catId });
    return res.status(200).json(new ApiResponse(200, subcategories, "Subcategories for the category fetched"));
});

// --- UPDATE a Subcategory ---
export const updateSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedSubcategory) {
        throw new ApiError(404, "Subcategory not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedSubcategory, "Subcategory updated successfully"));
});

// --- DELETE a Subcategory ---
export const deleteSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
        throw new ApiError(404, "Subcategory not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Subcategory deleted successfully"));
});