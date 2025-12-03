import { model, models, Schema, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views?: number;
  answers?: number;
  upvotes?: number;
  downvotes?: number;
  author: Schema.Types.ObjectId;
}

export interface IQuestionDoc extends IQuestion, Document {}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true, maxLength: 150 },
    content: { type: String, required: true, maxLength: 5000 },
    tags: { type: [{ type: Schema.Types.ObjectId, ref: "Tag" }], default: [] },
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question = models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
