import { model, Schema, Document } from "mongoose";

import { Product } from "../interfaces/product.model";

const productSchema = new Schema(
  {
    brandName: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required:true
    },
    name: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: [String], default: [] 
    },
    comments: { 
        type: [String], default: [] 
    },
    createdAt: {
        type: Date,
        default: new Date(),
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
)

export default model<Product & Document>("Product", productSchema);
