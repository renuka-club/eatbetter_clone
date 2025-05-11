router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const products = await Product.searchProducts(q);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
});