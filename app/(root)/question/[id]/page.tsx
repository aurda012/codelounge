import { auth } from "@clerk/nextjs/server";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import Metric from "@/components/shared/Metric";
import Votes from "@/components/shared/Votes";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import AllAnswers from "@/components/shared/AllAnswers";
import Answer from "@/components/forms/AnswerV2";
import { ITag } from "@/database/models/tag.model";
import { getQuestionById } from "@/database/actions/question.action";
import { getUserById } from "@/database/actions/user.action";
import { getFormattedNumber, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { addKeywords } from "@/constants/metadata";
import ReadTextEditor from "@/components/editor/ReadTextEditor";

const QuestionDetailPage = async ({
  params: { id },
  searchParams,
}: URLProps) => {
  const { question } = await getQuestionById({ questionId: id });
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              hasUpVoted={question.upvotes.includes(mongoUser?._id)}
              downvotes={question.downvotes.length}
              hasDownVoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="Message"
          value={getFormattedNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="Eye"
          value={getFormattedNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ReadTextEditor content={question.content} />

      <div className="mt-8 flex flex-row items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag: ITag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
      </div>
      <AllAnswers
        questionId={JSON.stringify(question._id)}
        userId={mongoUser?._id}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page ? +searchParams.page : 1}
      />
      {mongoUser && (
        <Answer
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(mongoUser)}
        />
      )}
    </>
  );
};

export default QuestionDetailPage;

export async function generateMetadata(
  { params: { id } }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const { question } = await getQuestionById({
    questionId: id,
  });
  // construct description based on user data
  const description = `Find answers and discussions about the question "${question.title}" on CodeLounge.`;
  const keys = question.tags.map((tag: any) => tag.name);
  const keywords = await addKeywords(keys);

  return {
    title: `${question.title} | CodeLounge`,
    description,
    keywords: keys,
  };
}
