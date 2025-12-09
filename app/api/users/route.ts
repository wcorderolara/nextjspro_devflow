import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorEsponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return NextResponse.json(
      {
        success: true,
        data: users,
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

    const validatedData = UserSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, username, email } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User with this email already exists.");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username is already taken.");

    const newUser = await User.create(validatedData.data);

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorEsponse;
  }
}
