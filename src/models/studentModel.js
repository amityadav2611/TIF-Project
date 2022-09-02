const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    userId: {
        type: ObjectId,
        ref: "user"
      },
    schoolId: {
        type: ObjectId,
        ref: "school"
      },
    created: {type: Date, default: Date.now()},
    updated: {type: Date, default: null}
});


module.exports = mongoose.model('student', studentSchema)