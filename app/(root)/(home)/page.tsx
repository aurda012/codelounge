import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/database/actions/question.action";
import { SearchParamsProps } from "@/types";
import { keywords } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "Home | CodeLounge",
  description:
    "CodeLounge is an inclusive, community-driven platform designed to empower developers and programming enthusiasts worldwide. Find answers to your coding problems, ask questions, engage with a vibrant community, explore comprehensive tutorials, and collaborate on innovative projects. Our mission is to provide a space where programmers can learn, share, and collaborate on coding projects while fostering a culture of support, mentorship, and growth. We believe that by coming together, we can create a more diverse and inclusive tech ecosystem that benefits everyone",
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
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={`/ask-question`} className="flex justify-end max-sm:w-full">
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
      <div className="mt-10">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        /> */}
      </div>
    </>
  );
}
