import * as zd from "zod";

export const SignInSchema = zd.object({
  email: zd
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  password: zd
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters long." }),
});

export const SignUpSchema = zd.object({
  username: zd
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
  name: zd
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters long." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),
  email: zd
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  password: zd
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
});

export const AskQuestionSchema = zd.object({
  title: zd
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters long." }),
  content: zd.string().min(10, { message: "Content must be at least 10 characters long." }),
  tags: zd
    .array(
      zd
        .string()
        .min(1, { message: "Tag cannot be empty." })
        .max(30, { message: "Tag cannot exceed 30 characters long." })
    )
    .min(1, { message: "At least one tag is required." })
    .max(5, { message: "You can add up to 5 tags only." }),
});

export const UserSchema = zd.object({
  username: zd
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(30, { message: "Name cannot exceed 50 characters long." }),
  name: zd
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters long." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),
  email: zd.string().email({ message: "Please provide a valid email address." }),
  bio: zd.string().max(160, { message: "Bio cannot exceed 160 characters long." }).optional(),
  image: zd.string().url({ message: "Please provide a valid URL." }).optional(),
  location: zd.string().max(100, { message: "Location cannot exceed 100 characters long." }).optional(),
  portfolio: zd
    .string()
    .url({ message: "Please provide a valid URL." })
    .max(200, { message: "Portfolio URL cannot exceed 200 characters long." })
    .optional(),
  reputation: zd.number().optional(),
});

export const AccountSchema = zd.object({
  userId: zd.string().regex(/^[a-f\d]{24}$/i, { message: "Invalid userId. Must be a Mongo ObjectId." }),
  name: zd.string().min(1, { message: "Name is required." }),
  image: zd.string().url({ message: "Please provide a valid URL." }).nullable().optional(),
  password: zd
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
    .nullable()
    .optional(),
  provider: zd.string().min(1, { message: "Provider is required." }),
  providerAccountId: zd.string().min(1, { message: "Provider account ID is required." }),
});

export const SignInWithOAuthSchema = zd.object({
  provider: zd.enum(["google", "github"], { message: "Unsupported provider." }),
  providerAccountId: zd.string().min(1, { message: "Provider account ID is required." }),
  user: zd.object({
    name: zd.string().min(1, { message: "Name is required." }),
    email: zd.string().email({ message: "Please provide a valid email address." }),
    image: zd.string().url({ message: "Please provide a valid URL." }).optional(),
    username: zd.string().min(3, { message: "Username must be at least 3 characters long." }).optional(),
  }),
});
