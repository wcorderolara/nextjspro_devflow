import { clsx, type ClassValue } from "clsx";
import next from "next";
import { twMerge } from "tailwind-merge";
import { types } from "util";
import { techMap } from "./techmap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string): any => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName] ? `${techMap[normalizedTechName]} colored` : "devicon-devicon-plain";
};

export const getTimeStamp = (date: Date): string => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const now = Date.now();
  const past = date.getTime();
  const diffInSeconds = Math.floor((past - now) / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  const abs = Math.abs(diffInSeconds);

  for (const [unit, seconds] of units) {
    if (abs >= seconds || unit === "second") {
      const value = Math.round(diffInSeconds / seconds);
      return rtf.format(value, unit);
    }
  }

  return rtf.format(0, "second");
};
