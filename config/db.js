const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nqlyr.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,

        useUnifiedTopology: true,

    });

    console.log('MongoDB connected')
}

module.exports = connectDB;