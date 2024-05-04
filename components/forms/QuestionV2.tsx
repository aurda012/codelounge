"use client";

import { Editor } from "@tinymce/tinymce-react";
import { KeyboardEvent, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useTheme } from "next-themes";
import {
  createQuestion,
  editQuestion,
} from "@/database/actions/question.action";
import { QuestionSchema } from "@/lib/validations";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { ITag } from "@/database/models/tag.model";
import { toast } from "../ui/use-toast";
import TextEditor from "../editor/TextEditor";
import { createCodeLoungeAIAnswer } from "@/database/actions/answer.action";
import { Loading } from "../shared/Loading";
import ShortcutsMenu from "../editor/ShortcutsMenu";

interface Props {
  mongoUserId: string;
  type?: string;
  questionDetails?: string;
}

const Question = ({ mongoUserId, type, questionDetails }: Props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const parsedQuestionDetails =
    type === "edit" ? JSON.parse(questionDetails || "") : "";

  const groupTags =
    type === "edit"
      ? parsedQuestionDetails.tags.map((tag: ITag) => tag.name)
      : [];

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parsedQuestionDetails.title || "",
      explanation: parsedQuestionDetails.content || "",
      tags: groupTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "edit") {
        await editQuestion({
          title: values.title,
          content: values.explanation,
          path: pathname,
          questionId: parsedQuestionDetails._id,
        });

        toast({
          title: "Question Details Successfully Updated",
          variant: "success",
        });

        //* navigate to question detail page
        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        setLoadingMessage("Pushing your question to the database...");
        // Todo: make a async call to your API -> create question
        const question = await createQuestion({
          title: values.title,
          tags: values.tags,
          content: values.explanation,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });

        // Todo: contain all form data

        // toast({
        //   title: `Question has been created`,
        //   variant: "success",
        // });

        setLoadingMessage("Our AI is finding your answer...");

        await createCodeLoungeAIAnswer({
          question: question.title,
          questionDescription: question.content,
          questionId: question._id,
          path: `/question/${question._id}`,
        });

        //* navigate to home page
        router.push(`/question/${question._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setLoadingMessage("");
      toast({
        title: `CodeLounge AI has answered your question!`,
        variant: "success",
      });
    }
  }

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <>
      {isSubmitting && <Loading message={loadingMessage} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
            }
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border rounded-[8px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking question to another
                  person.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <div className="flex flex-row items-center justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Detailed explanation of your problem{" "}
                    <span className="text-primary-500">*</span>
                  </FormLabel>
                  <ShortcutsMenu />
                </div>
                <FormControl className="mt-3.5">
                  <TextEditor
                    onChange={(content) => field.onChange(content)}
                    content={JSON.parse("[]")}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      disabled={type === "edit"}
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border rounded-[8px]"
                      placeholder="Add tags..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5 ">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() =>
                              type !== "edit"
                                ? handleTagRemove(tag, field)
                                : () => {}
                            }
                          >
                            {tag}
                            {type !== "edit" && (
                              <Image
                                src="/icons/close.svg"
                                alt="close"
                                width={12}
                                height={12}
                                className="cursor-pointer object-contain invert-0 dark:invert"
                              />
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags to describe your question is about. You need
                  to press enter to add a tag.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="z-[99999] primary-gradient w-fit !text-light-900 rounded-[8px]"
            // onClick={(e) => {
            //   e.preventDefault();
            //   setIsSubmitting((prev) => !prev);
            // }}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Question;
