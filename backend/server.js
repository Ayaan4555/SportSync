// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sportCategoryRoutes = require('./routes/sportCategoryRoutes');
const cityRoutes = require('./routes/cityRoutes');
const areaRoutes = require("./routes/areaRoutes");
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const path = require("path")



// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin/sport-categories', sportCategoryRoutes);
app.use('/api/admin/cities', cityRoutes);
app.use('/api/admin/areas', areaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Sample route



app.get('/', (req, res) => {
  res.send('API is running...');
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
