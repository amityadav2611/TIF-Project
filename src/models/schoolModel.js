const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    created: {type: Date, default: Date.now()},
    updated: {type: Date, default: null}
});


module.exports = mongoose.model('school', schoolSchema)