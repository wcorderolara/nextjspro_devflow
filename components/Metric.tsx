import Image from "next/image";
import Link from "next/link";
import { text } from "node:stream/consumers";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({ imgUrl, alt, value, title, href, textStyles, imgStyles, isAuthor }: MetricProps) => {
  const metricContent = (
    <>
      <div className="flex gap-1">
        <Image src={imgUrl} alt={alt} width={16} height={16} className={`rounded-full object-contain ${imgStyles}`} />

        <p className={`${textStyles} flex items-center gap-1`}>
          {value} <span className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>{title}</span>
        </p>
      </div>
    </>
  );
  return href ? <Link href={href}>{metricContent}</Link> : <div>{metricContent}</div>;
};

export default Metric;
