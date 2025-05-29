const mongoose = require('mongoose');

const licensePlateSchema = new mongoose.Schema({
  license_plate: String,
  confidence: Number,
  slot:String,
  timestamp: Date,
  userType: String,
  status: String  ,
  unauthorized:Boolean,
  updatedByAdmin:Boolean,
  imagePath: String,
});

module.exports = mongoose.model('LicensePlate', licensePlateSchema);
