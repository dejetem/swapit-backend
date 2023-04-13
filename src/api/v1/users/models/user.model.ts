import { model, Schema, Document } from "mongoose";

import { User } from "../interfaces/user.model";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Comment",
      select: false,
    },
    products: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: "Product",
      select: false,
    },
    password: {
      type: String,
      reauired: true,
    },
    phoneNumber: {
      type: String,
      reauired: true,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpiration: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc: any, ret: any) {
        delete ret._id;
      },
    },
  }
);

export default model<User & Document>("User", UserSchema);
