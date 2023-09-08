const { Schema, model } = require('mongoose');

// define schema for User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      matches: [/\w+@\w+(.\w{2,3})+/, "Invalid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Define a virtual property 'friendCount' to calculate number of friends
userSchema.virtual("friendCount").get(function() {
  return this.friends.length
});

// Create the User model using defined schema
const User = model('user', userSchema);

module.exports = User;
