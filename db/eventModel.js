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

  attendees: {
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
    required: [true, "Please provide a time!"],
    unique: false, 
  },

  end_time: {
    type: Date,
    required: [true, "Please provide a time!"],
    unique: false, 
  },
});

// export UserSchema
module.exports = mongoose.model.Events || mongoose.model("Events", EventSchema);