import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { Question, Tag } from "@/types/global";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Metric from "../Metric";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="items-start-justify-between flex flex-col-reverse gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(question.createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(question._id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{question.title}</h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {question.tags.map((tag: Tag | string) => {
          const tagData = typeof tag === "string" ? { _id: tag, name: tag } : tag;
          return <TagCard key={tagData._id} tag={tagData} compact />;
        })}
      </div>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <Metric
          imgUrl={question.author.avatarUrl}
          alt={question.author.name}
          value={question.author.name}
          title={`- asked ${getTimeStamp(question.createdAt)} ago`}
          href={ROUTES.PROFILE(question.author._id)}
          textStyles="bod-medium text-dark400_light700"
          imgStyles="rounded"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like"
            value={question.upvotes}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="Answers"
            value={question.answers}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="Views"
            value={question.views}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
