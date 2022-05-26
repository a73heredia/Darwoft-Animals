require('dotenv').config({ path: "./config.env" })
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();
const auth = require('./routes/auth');
const private = require('./routes/private');


app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/private', private);

app.use(errorHandler);

const PORT = process.env.PORT;



const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error ${err}`);
    server.close(() => { process.exit(1) });
})