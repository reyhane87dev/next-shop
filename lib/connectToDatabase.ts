import mongoose from "mongoose";

const isAlreadyConnected = false;

function connectToDatabase() {
  if (isAlreadyConnected) return;
  mongoose
    .connect(process.env.DB_ADDRESS!)
    .then(() => {
      console.log("Connected to data base");
    })
    .catch(() => {
      console.log("Failed to connect the data base");
    });
}
export default connectToDatabase;
