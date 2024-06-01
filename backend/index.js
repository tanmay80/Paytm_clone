const mainRouter = require("./routes/index");
const { mongoose } = require('../database/database'); 

const cors = require("cors")
const express= require("express");
const app=express();
const port=3000;

app.use(cors());
app.use(express.json())
app.use("/api/v1",mainRouter)

// Ensure the server starts only after a successful database connection
mongoose.connection.once('open', () => {
    console.log('Mongoose connected to the database');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

// Handle connection errors
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});