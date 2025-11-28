import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { getDeviconClassName } from "@/lib/utils";
import { Tag } from "@/types/global";
import Image from "next/image";

interface Props {
  tag: Tag;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: (tag: string, field: { value: string[] }) => void;
}

const TagCard = ({ tag, showCount, compact, remove, isButton, handleRemove }: Props) => {
  const iconClass = getDeviconClassName(tag.name);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          {/* <i className={`text-sm ${compact ? "hidden" : iconClass}`}></i> */}
          <i className={`text-sm ${iconClass}`}></i>
          <span>{tag.name}</span>
        </div>
        {remove && (
          <Image
            src="/icons/close.svg"
            alt="Remove Tag"
            width={12}
            height={12}
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={() => handleRemove && handleRemove(tag._id, { value: [] })}
          />
        )}
      </Badge>

      {showCount && <p className="small-medium text-dark500_light700">{tag.questions}</p>}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(tag._id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  } else {
    return (
      <Link href={ROUTES.TAG(tag._id)} className="flex justify-between gap-2">
        {content}
      </Link>
    );
  }
};

export default TagCard;
