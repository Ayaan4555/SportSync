const mongoose = require("mongoose");

// Define the event schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you're using a User model for user data
      required: true,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "SportCategory", required:true ,},
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" , required:true,},
    area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" , required:true,},
    
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
