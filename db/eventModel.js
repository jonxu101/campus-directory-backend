const mongoose = require("mongoose");

// event schema
const EventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Please provide a Title!"],
    unique: false,
  },

  details:{
    type: String,
    required: [true, "Please provide event details!"],
    unique: false,
  },

  host_email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: false,
  },

  is_invite_only:{
    type: Boolean,
    required: [true, "Please provide invite only details"],
    unique: false,
  },

  max_attendees:{
    type: Number,
    required: [true, "Please provide max capacity"],
    unique: false,
  },

  attendees: {
    type: [String],
    default: [],
    unique: false,
  },

  maybe: {
    type: [String],
    default: [],
    unique: false,
  },

  invited: {
    type: [String],
    default: [],
    unique: false,
  },

  location: {
    type: String,
    required: [true, "Please provide a location!"],
    unique: false
  },
  //new Date(meet.date).toLocaleString();
  start_time: {
    type: Date,
    required: [true, "Please provide a start time!"],
    unique: false, 
  },

  end_time: {
    type: Date,
    required: [true, "Please provide an end time!"],
    unique: false, 
  },
});

// export UserSchema
module.exports = mongoose.model.Event || mongoose.model("Events", EventSchema);