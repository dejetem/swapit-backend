import { model, Schema, Document } from "mongoose";

import { Comment } from "../interfaces/product.model";

const commentSchema = new Schema(
  {
    description: {
        type:String,
        required:true
    },
    creator: [
      { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    name: {
      type:String,
      required:true
    },
    product: [
    { type: Schema.Types.ObjectId, ref: 'Product' }
    ]
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

export default model<Comment & Document>("Comment", commentSchema);
