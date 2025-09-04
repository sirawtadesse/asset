// load environment variables
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on NODE_ENV
dotenv.config({ path: path.resolve(__dirname, .env.${process.env.NODE_ENV}) });

const app = require('./app');

app.get('/', (req, res) => res.send('Express on Vercel'));

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PORT);

// Check if NODE_ENV is set to "production" or "staging" to determine if it's running on Vercel
if (process.env.NODE_ENV === 'local') {
  // Start server locally
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
  });
}

module.exports = app;
