const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const seedProduct = require('./utils/seedProduct');

const app = express();
const PORT = process.env.PORT || 10000; // You had 1000 earlier—your Render log shows 10000, so keep it consistent

// ✅ CORS Setup — Allow Vercel Frontend to Access This Backend
app.use(cors({
  origin: ['https://eatbetterbackend.vercel.app', 'http://localhost:3000'], // Vercel + Dev local
  credentials: true
}));

// Middleware
app.use(express.json());

// ✅ Serve Static Images (like product images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/product', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');

    // Seed Products (if needed)
    await seedProduct();

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
