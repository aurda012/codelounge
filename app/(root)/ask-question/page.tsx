import { redirect } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";

import { getUserById } from "@/database/actions/user.action";

const Question = dynamic(() => import("@/components/forms/QuestionV2"));

import { keywords } from "@/constants/metadata";

const AskQuestionPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongooseUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongooseUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestionPage;

export const metadata: Metadata = {
  title: "Ask a Question | CodeLounge",
  description:
    "Ready to get answers? Ask your coding questions and get help from the CodeLounge AI and the developer community",
  keywords: keywords,
};
