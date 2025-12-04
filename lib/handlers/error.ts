import { NextResponse } from "next/server";
import { HttpError, ValidationError } from "../http-errors";
import { flattenError, ZodError } from "zod";
import logger from "../logger";

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
    logger.error({ err: error }, `${responseType.toUpperCase()} ERROR: ${error.message}`);
    return formatResponse(responseType, error.statusCode, error.message, error.errors);
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);

    logger.error({ err: error }, `Validation Error: ${validationError.message}`);

    return formatResponse(responseType, validationError.statusCode, validationError.message, validationError.errors);
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(responseType, 500, error.message);
  }

  logger.error({ err: error }, "An unknown error occurred");
  return formatResponse(responseType, 500, "An unknown error occurred");
};

export default handleError;
