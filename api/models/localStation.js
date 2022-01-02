const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stationName: {
      type: String,
      unique: true,
      required: true
    },
    lat: {
      type: String,
      required: true
    },
    long: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('localStation', stationSchema);
