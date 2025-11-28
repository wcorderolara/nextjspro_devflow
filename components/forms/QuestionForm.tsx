"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Form } from "../ui/form";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  // Initialize the form with react-hook-form and zod validation
  // Set default values for the form fields
  // useFrom Hook from react-hook-form and zodResolver from @hookform/resolvers/zod
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
        {/* QUESTION TITLE */}
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor="title" className="paragraph-semibold text-dark400_light800 font-extrabold">
                  Question Title <span className="text-primary-500">*</span>
                </FieldLabel>
                <Input
                  id="title"
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <FieldDescription className="body-regular text-white-500 mt-2.5">
                  Be specific and imagine you are asking a question to another person.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        {/* CONTENT QUESTION */}
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid="content" className="flex w-full flex-col">
                <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800 font-extrabold">
                  Detailed explanation of your problem <span className="text-primary-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <Editor editorRef={editorRef} value={field.value} fieldChange={field.onChange} />
                </FieldContent>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <FieldDescription className="body-regular text-white-500 mt-2.5">
                  Introduce the problem and expand on what you put in the title. Include all the information someone
                  would need to answer your question.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        {/* TAGS */}
        <FieldGroup>
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-3">
                <FieldLabel htmlFor="tags" className="paragraph-semibold text-dark400_light800 font-extrabold">
                  Tags <span className="text-primary-500">*</span>
                </FieldLabel>
                <FieldContent>
                  <div>
                    <Input
                      id="tags"
                      className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      {...field}
                    />
                    TAGS
                  </div>
                </FieldContent>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <FieldDescription className="body-regular text-white-500 mt-2.5">
                  Add up to 5 tags to describe what your question is about. You need to press enter to add a Tag.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-fit"
          >
            Post Your Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
