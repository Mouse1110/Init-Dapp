const mongoose = require('mongoose');
const nameShema = new mongoose.Schema({
    address:String,
});
module.exports = mongoose.model('name',nameShema);