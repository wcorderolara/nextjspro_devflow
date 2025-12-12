import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorEsponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();

    return NextResponse.json(
      {
        success: true,
        data: accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorEsponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = AccountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { userId, provider, providerAccountId } = validatedData.data;

    // Prevent duplicate account for the same userId + provider
    const existingForProvider = await Account.findOne({ userId, provider });
    if (existingForProvider) {
      throw new Error("Account already exists for this provider and user.");
    }

    // Optionally ensure providerAccountId is unique within the provider
    const existingProviderAccount = await Account.findOne({ provider, providerAccountId });
    if (existingProviderAccount) {
      throw new ForbiddenError("Provider account ID is already linked.");
    }

    const newAccount = await Account.create(validatedData.data);

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorEsponse;
  }
}
