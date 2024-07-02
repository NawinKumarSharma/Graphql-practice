import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

  },
  {
    timestamps: true
  }
)

export const User = mongoose.model("User", userSchema)