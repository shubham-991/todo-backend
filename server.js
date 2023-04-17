// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {notFound, errorHandler} = require("./middlewares/errorMiddleware");
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
// Initialize app and router
const app = express();
app.use(cors());
//creating the instance of express app
dotenv.config();
connectDB();




app.use(express.json()); //to accept json data

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

//error handling middleware

app.use(notFound);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
