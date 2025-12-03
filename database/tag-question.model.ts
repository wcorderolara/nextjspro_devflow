import { model, models, Schema } from "mongoose";

export interface ITagQuestion {
  question: Schema.Types.ObjectId;
  tagId: Schema.Types.ObjectId;
}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  { timestamps: true }
);

const TagQuestion = models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
