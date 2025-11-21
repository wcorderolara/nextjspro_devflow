"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; data?: any; error?: string }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({ schema, defaultValues, formType, onSubmit }: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO Authentication logic
  };
  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <>
      <form id="form-rhf-demo" className="mt-10 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <p className="py-2 text-2xl font-bold">{buttonText}</p>
        <FieldGroup>
          {Object.keys(defaultValues).map((field) => (
            <Controller
              key={field}
              name={field as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                  <FieldLabel htmlFor={field.name} className="paragraph-medium text-dark400_light700">
                    {field.name === "email"
                      ? "Email Address"
                      : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                  </FieldLabel>
                  <Input
                    {...field}
                    type={field.name === "password" ? "password" : field.name === "email" ? "email" : "text "}
                    id={field.name}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
        <Field orientation="vertical">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signin In..." : "Signin Up...") : buttonText}
          </Button>

          {formType === "SIGN_IN" ? (
            <p>
              Don't have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
                Sign in
              </Link>
            </p>
          )}
        </Field>
      </form>
    </>
  );
};

export default AuthForm;
