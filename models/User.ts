import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      required: true,
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    records: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Record",
    },
  })
);

export default User;
