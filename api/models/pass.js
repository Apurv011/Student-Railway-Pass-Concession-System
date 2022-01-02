const mongoose = require('mongoose');

const passSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    email: {
      type: String
    },
    collegeID: {
      type: String
    },
    contactNo: {
      type: String
    },
    duration: {
      type: String,
      required: true
    },
    collegeIDImage: {
      type: String,
      default:""
    },
    status: {
      type: String,
      default: ""
    },
    dob: {
      type: String
    },
    remark: {
      type: String,
      default: ""
    }
});


module.exports = mongoose.model('Pass', passSchema);
