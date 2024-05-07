import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { getSavedQuestions } from "@/database/actions/user.action";

const QuestionCard = dynamic(() => import("@/components/cards/QuestionCard"));
const Filter = dynamic(() => import("@/components/shared/Filter"));
const LocalSearchBar = dynamic(
  () => import("@/components/shared/search/LocalSearchBar")
);
const NoResult = dynamic(() => import("@/components/shared/NoResult"));
const Pagination = dynamic(() => import("@/components/shared/Pagination"), {
  ssr: false,
});

import { QuestionFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";

export default async function CollectionPage({
  searchParams,
}: SearchParamsProps) {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const result = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
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
            title="These's no saved questions to show"
            description="Ask a Question and kickstart the
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

export const metadata: Metadata = {
  title: "Collection | CodeLounge",
  description:
    "Explore a personalized collection of your saved questions on CodeLounge. Join our community of developers and access your curated repository of valuable insights and solutions.",
};
