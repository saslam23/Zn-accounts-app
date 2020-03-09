const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    isAuthenticated: {type: Boolean, default: false}
})

const User = mongoose.model("User", userSchema);

module.exports = User;