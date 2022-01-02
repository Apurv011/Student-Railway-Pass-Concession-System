const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    contactNo: { type: Number, required: true },
    collegeID: { type: String, required: true },
    collegeIDImage: { type: String, default:"" },
    dob: { type: String },
    remark: { type: String, default:"" },
    isVerified: { type: String, default: "pending" },
    age: { type: Number }
});

module.exports = mongoose.model('User', userSchema);
