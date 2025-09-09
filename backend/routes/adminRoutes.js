import { Router } from 'express';

import { 
    createCategory, getCategories, updateCategory, deleteCategory 
} from '../controllers/categoryController.js';
import { 
    createSubcategory, getSubcategories, getSubcategoriesByCategoryId, updateSubcategory, deleteSubcategory 
} from '../controllers/subcategoryController.js';
import { 
    createProduct, getProducts, updateProduct, deleteProduct 
} from '../controllers/productController.js';

const router = Router();

// --- Category Routes ---
router.route('/categories')
    .post(createCategory)
    .get(getCategories);

router.route('/categories/:id')
    .put(updateCategory)
    .delete(deleteCategory);

// --- Subcategory Routes ---
router.route('/subcategories')
    .post(createSubcategory)
    .get(getSubcategories);

router.route('/subcategories/:id')
    .put(updateSubcategory)
    .delete(deleteSubcategory);

router.route('/subcategories/category/:catId')
    .get(getSubcategoriesByCategoryId);

// --- Product Routes ---
router.route('/products')
    .post(createProduct)
    .get(getProducts);

router.route('/products/:id')
    .put(updateProduct)
    .delete(deleteProduct);

export default router;