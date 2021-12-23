import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  expiredTokens: [String],
});

export const User = mongoose.model("users", userSchema);
