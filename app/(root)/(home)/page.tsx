import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const LocalSearchBar = dynamic(
  () => import("@/components/shared/search/LocalSearchBar")
);
const Filter = dynamic(() => import("@/components/shared/Filter"));
const HomeFilters = dynamic(() => import("@/components/home/HomeFilters"));
const QuestionCard = dynamic(() => import("@/components/cards/QuestionCard"));
const NoResult = dynamic(() => import("@/components/shared/NoResult"));
const Pagination = dynamic(() => import("@/components/shared/Pagination"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/database/actions/question.action";
import { SearchParamsProps } from "@/types";
import { keywords } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "Home | CodeLounge",
  description:
    "Find answers to your coding problems. CodeLounge is a community-driven platform designed to empower developers worldwide. Ask questions, engage with the community and collaborate on projects.",
  keywords: keywords,
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();

  let result;

  if (searchParams?.filter === "recommended") {
    if (clerkId) {
      result = await getRecommendedQuestions({
        userId: clerkId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full justify-between gap-1 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={`/ask-question`} className="flex justify-end">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 rounded-[8px]">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              clerkId={clerkId}
              key={question._id}
              tags={question.tags}
              title={question.title}
              author={question.author}
              upvotes={question.upvotes.length}
              answers={question.answers}
              views={question.views}
              _id={question._id}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Questions Found"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your question could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10 mb-4">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
