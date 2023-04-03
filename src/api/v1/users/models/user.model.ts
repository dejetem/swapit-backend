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
      reauired: true,
    },
    password: {
      type: String,
      reauired: true,
    },
    phoneNumber: {
      type: String,
      reauired: true,
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
