const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔍 Route to search products by name or description
router.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive
    const products = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    res.json(products);
  } catch (error) {
    console.error('Error during product search:', error);
    res.status(500).json({ message: 'Search failed, please try again.' });
  }
});

// ✅ Route to fetch best seller products
router.get('/bestsellers', async (req, res) => {
  try {
    const bestSellers = await Product.find({ isBestSeller: true });
    res.json(bestSellers);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({ message: 'Error fetching best seller products' });
  }
});

// ✅ Route to fetch products by category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products for the category' });
  }
});

// ✅ Route to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
