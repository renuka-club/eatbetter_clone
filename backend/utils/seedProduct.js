// utils/seedProduct.js

const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust path if needed
require('dotenv').config();

const products = [
  {
    name: "Rasgulla",
    description: "Soft and juicy Bengali sweet",
    price: 180,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/rasgulla.jpg",
    isBestSeller: true,
    stock: 60
  },
  {
    name: "Foxtail Millet Mixture",
    description: "Crispy mixture with foxtail millet and traditional spices",
    price: 120,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/foxtail.jpeg",
    isBestSeller: true,
    stock: 10
  },
  {
    name: "Ragi Cookies",
    description: "Nutritious sweet cookies made with ragi and jaggery",
    price: 90,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/cookie.jpeg",
    isBestSeller: false,
    stock: 50
  },
  {
    name: "Bajra Chakli",
    description: "Crunchy spiral snack made from bajra flour and spices",
    price: 75,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/image4.jpg",
    isBestSeller: true,
    stock: 80
  },
  {
    name: "Little Millet Ladoo",
    description: "Sweet balls made from little millet, jaggery, and ghee",
    price: 150,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/ladoo.jpeg",
    isBestSeller: false,
    stock: 40
  },
  {
    name: "Kodo Millet Chivda",
    description: "Light and crunchy chivda made with kodo millet flakes",
    price: 110,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/millets.jpeg",
    isBestSeller: false,
    stock: 70
  },
  {
    name: "Jowar Flakes Mixture",
    description: "Delicious jowar-based mixture with dry fruits and masala",
    price: 95,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/mixer.jpeg",
    isBestSeller: true,
    stock: 60
  },
  {
    name: "Barnyard Ladoo",
    description: "Barnyard millet sweet laddus, perfect for festivals",
    price: 100,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/ladoo.jpeg",
    isBestSeller: false,
    stock: 85
  },
  {
    name: "Mixed Millet Mixture",
    description: "Savory snack with a blend of five millets and spices",
    price: 160,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/rice.jpeg",
    isBestSeller: true,
    stock: 90
  },
  {
    name: "Millet Energy Bar (Sweet)",
    description: "Sweet bar with millet, honey, and dry fruits",
    price: 50,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/dry.jpeg",
    isBestSeller: true,
    stock: 120
  },
  {
    name: "Ragi Dosa Chips",
    description: "Crispy chips made from ragi dosa mix with light masala",
    price: 130,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/dosa.jpeg",
    isBestSeller: false,
    stock: 55
  },
  {
    name: "Proso Millet Halwa",
    description: "Traditional Indian halwa made with proso millet and ghee",
    price: 105,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/rice.jpeg",
    isBestSeller: false,
    stock: 65
  },
  {
    name: "Millet Laddu",
    description: "Classic Indian sweet with millets and jaggery",
    price: 70,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/ladoo.jpeg",
    isBestSeller: true,
    stock: 100
  },
  {
    name: "Ragi Malt Balls",
    description: "Bite-sized sweet balls made with ragi malt and cardamom",
    price: 140,
    category: "meetha",
    imageUrl: "https://eatbetterbackend.onrender.com/images/raghiidly.jpeg",
    isBestSeller: false,
    stock: 75
  },
  {
    name: "Millet Masala Noodles",
    description: "Spicy instant noodles made with millets and masala",
    price: 85,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/ramen.jpeg",
    isBestSeller: true,
    stock: 90
  },
  {
    name: "Little Millet Upma Bites",
    description: "Savory millet upma turned into crispy namkeen bites",
    price: 125,
    category: "namkeen",
    imageUrl: "https://eatbetterbackend.onrender.com/images/poori.jpeg",
    isBestSeller: false,
    stock: 50
  }
];

async function seedProducts() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ All products seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
  }
}

module.exports = seedProducts;
