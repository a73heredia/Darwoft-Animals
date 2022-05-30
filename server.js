require('dotenv').config({ path: "./config.env" })
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

connectDB();

const app = express();
const auth = require('./routes/auth');
const private = require('./routes/private');
const dogs = require('./routes/dogsRoutes/Dogs');
const dog = require('./routes/dogsRoutes/Dog');

app.use(express.json());
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/private', private);
app.use('/api/dogs', dogs);
app.use('/api/dog', dog);

app.use(errorHandler);

const PORT = process.env.PORT;



const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error ${err}`);
    server.close(() => { process.exit(1) });
})