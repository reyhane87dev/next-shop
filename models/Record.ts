import mongoose from "mongoose";

const Record = mongoose.model(
  "Record",
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "Other",
    },
    createdAt: {
      type: String,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

export default Record;
