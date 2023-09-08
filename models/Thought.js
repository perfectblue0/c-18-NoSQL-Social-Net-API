const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/dateFormat.js');

// define schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


// Defines a virtual property 'reactionCount' to calculate number of reactions
thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length
});

// Create the Thought model using the defined schema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
