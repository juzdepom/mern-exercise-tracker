const express = require('express');
const cors = require('cors');
//this while help us connect to the mongoDB database
const mongoose = require('mongoose');

require('dotenv').config();

//this is how we will create our express server
const app = express();
const port = process.env.PORT || 5000;

//this is our middleware that will allow us to parse JSON
app.use(cors());
app.use(express.json());

//we have to get the URI from the mongoDB dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
})

//require the files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//whenever we put /exercises or /users it is going to load everything in the router (not sure what this means yet as I'm writing this)
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//this is what starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})