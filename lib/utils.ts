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
