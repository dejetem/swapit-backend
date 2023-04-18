import { model, Schema, Document } from "mongoose";

import { Product } from "../interfaces/product.model";

const productSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    tags: [String],
    selectedFile: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    files: {
      type: String,
      required: false,
    },
    likeCount: {
      type: [String],
      default: [],
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

export default model<Product & Document>("Product", productSchema);
