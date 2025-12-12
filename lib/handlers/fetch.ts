import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { HttpError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number; // timeout in milliseconds
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(url: string, options: FetchOptions = {}): Promise<ActionResponse<T>> {
  const { timeout = 5000, headers: customHeader = {}, ...restOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeader };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new HttpError(response.status, response.statusText || errorText);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("An unknown error occurred");
    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out after ${timeout}ms`);
    } else {
      logger.error(`Fetch error for ${url}: ${error.message}`);
    }

    return handleError(error) as unknown as ActionResponse<T>;
  }
}
