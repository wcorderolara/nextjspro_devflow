import { NextResponse } from "next/server";
import { HttpError, ValidationError } from "../http-errors";
import { flattenError, ZodError } from "zod";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    detail: errors,
    title: message,
    type: responseType,
  };

  return responseType === "api" ? NextResponse.json(responseContent, { status }) : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof HttpError) {
    return formatResponse(responseType, error.statusCode, error.message, error.errors);
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);

    return formatResponse(responseType, validationError.statusCode, validationError.message, validationError.errors);
  }

  if (error instanceof Error) {
    return formatResponse(responseType, 500, error.message);
  }

  return formatResponse(responseType, 500, "An unknown error occurred");
};

export default handleError;
