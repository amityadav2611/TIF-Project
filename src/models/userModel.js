const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
      },
    mobile: {
        type: String,
        unique: true,
        trim: true
      },
    password: {
        type: String,
        trim: true
      },
    roleId: {
        type: ObjectId,
        ref: "role"
      },
      created: {type: Date, default: Date.now()},
      updated: {type: Date, default: null}
});


module.exports = mongoose.model('user', userSchema)