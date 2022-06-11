import mongoose from 'mongoose';
const { Schema } = mongoose;

//need to connect db

const questions = Schema({
  questions_id: String,
})

// module.exports = mongoose.model("user", UserScheme);