// app.js
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const vendorRoutes = require('./routes/vendors');
const masterRoutes = require('./routes/master');

const app = express();

// Custom CORS middleware to set additional headers
const customCors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Use specific origin in production
  // Another common pattern: Allow dynamic origin
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Proceed to next middleware or route
  next();
};

// Apply built-in CORS middleware (allowing all origins in this case)
app.use(cors());

// Apply custom CORS middleware for additional headers
app.use(customCors);

// Parse incoming JSON
app.use(express.json());

// Use your routes
app.use('/products', productRoutes);
app.use('/vendors', vendorRoutes);
app.use('/master', masterRoutes);

// Export the app (no need for allowCors wrapper)
module.exports = app;```

folder structure

![unnamed|273x500](upload://5R1AAteLmmvnExyh7JWqH6tlJe5.png)
