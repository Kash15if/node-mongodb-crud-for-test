const mongoose = require('./dbCon');

const userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String,
    country: String,

});

module.exports = mongoose.model('User', userSchema);