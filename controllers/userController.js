const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const { create } = require('../models/User');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },

  // Add an assignment to a student
  addFriend(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};
