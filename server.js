const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// env config
dotenv.config();  // if its in any any other folder other than root we can also, specify the path

// router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// MongoDB connection
connectDB();

// app
const app = express();

// middlewares
app.use(express.json()); // due to this we can receive JSON data from client
app.use(morgan('dev'));

// Allow dynamic Gitpod URLs
const corsOptions = {
    origin: [
      'https://5173-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io', // Frontend origin
    ],
    credentials: true, // Allow cookies or credentials if needed
  };
  
  app.use(cors(corsOptions));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(8080, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})