const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    email: String,
    name: String,
    number: String,
    product: String,
  });
  
  const LeadModel = mongoose.model('leads', leadSchema);

  module.exports= LeadModel;