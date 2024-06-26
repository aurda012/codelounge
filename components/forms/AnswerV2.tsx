"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";

import { createAnswer } from "@/database/actions/answer.action";

const TextEditor = dynamic(() => import("../editor/TextEditor"));
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "../ui/use-toast";

import { AnswerSchema } from "@/lib/validations";

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
import ShortcutsMenu from "../editor/ShortcutsMenu";

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

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Answer</h4>
        <ShortcutsMenu />
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
