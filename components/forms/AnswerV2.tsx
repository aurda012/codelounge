"use client";

import { createAnswer } from "@/database/actions/answer.action";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { convert } from "html-to-text";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";
import TextEditor from "../editor/TextEditor";

interface Props {
  authorId: string;
  question: string;
  questionDescription: string;
  questionId: string;
}

// Note: please restart the page if syntax highlighting works bad.
import { lowlight } from "lowlight";
import { toHtml } from "hast-util-to-html";
import { formatChatGPTResponseToHtml } from "@/lib/utils";

const response = "";

const Answer = ({
  authorId,
  question,
  questionDescription,
  questionId,
}: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingAi, setIsSubmittingAi] = useState<boolean>(false);
  const [content, setContent] = useState(response);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  console.log(JSON.parse(authorId));

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    // ? create new answer function.
    try {
      setIsSubmitting(true);
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      toast({
        title: "Answer successfully submitted",
        variant: "success",
      });

      form.reset();

      setContent("<p></p>");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAi(true);

    const options = {
      wordwrap: 130,
      // ...
    };
    const questionString = convert(questionDescription, options);

    const ques = question + " " + questionString;

    console.log({ ques });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ question: ques }),
        }
      );

      const aiAnswer = await response.json();

      console.log({ aiAnswer });

      // Todo: Convert plain text to HTML format.

      const formatAnswer = formatChatGPTResponseToHtml(aiAnswer.reply);

      console.log({ formatAnswer });

      setContent(formatAnswer);

      // Todo: Add Toast...
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingAi(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          onClick={generateAIAnswer}
          disabled={isSubmitting}
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          type="submit"
        >
          {isSubmittingAi ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="start"
                width={12}
                height={12}
                className="object-contain text-white"
              />
              Generate AI answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
            }
          }}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <TextEditor
                    onChange={(content) => field.onChange(content)}
                    content={content as any}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="primary-gradient w-fit text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
