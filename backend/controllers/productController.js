import Product from '../models/Product.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, subcategory } = req.body;
    if (!name || !description || !price || !category || !subcategory) {
        throw new ApiError(400, "All fields are required");
    }
    const product = await Product.create({ name, description, price, category, subcategory });
    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category', 'name').populate('subcategory', 'name');
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

// Product ko update karna (MISSING PART)
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});