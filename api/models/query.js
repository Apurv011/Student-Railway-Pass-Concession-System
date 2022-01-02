const mongoose = require('mongoose');

var date = getDate();

const querySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true
    },
    que: {
      type: String,
      required: true
    },
    ans: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: date
    },
    userName: {
        type: String,
        required: true
    },
    branch: {
        type: String
    },
    email: {
      type: String
    },
    isAns: {
      type: Boolean,
      default: false
    }
});

function getDate(){

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today;

}

module.exports = mongoose.model('Query', querySchema);
