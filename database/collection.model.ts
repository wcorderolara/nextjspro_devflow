import { model, models, Schema, Document } from "mongoose";

export interface ICollection {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

export interface ICollectionDoc extends ICollection, Document {}
const CollectionSchema = new Schema<ICollection>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true }
);

const Collection = models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
