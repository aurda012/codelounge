import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { addKeywords } from "@/constants/metadata";
import { getQuestionsByTagId, getTagById } from "@/database/actions/tag.action";
import { slugify } from "@/lib/utils";
import { URLProps } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const TagDetailPage = async ({ params: { slug }, searchParams }: URLProps) => {
  const [id, title] = slug;
  if (id.length !== 24) {
    return (
      <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
        <NoResult
          title="No Tag Found"
          description="It looks like there isn't a tag with that ID."
          link="/ask-question"
          linkTitle="Ask a question"
        />
      </div>
    );
  }
  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId: id,
    searchQuery: searchParams.q,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  const slugTitle = slugify(tagTitle);
  if (title !== slugTitle) {
    redirect(`/tags/${id}/${slugTitle}`);
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle} Questions</h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${id}`}
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map((question: any) => (
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
            title="These's no Tag questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. Your question could be the next big thing others learn from. Get
      involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default TagDetailPage;

export async function generateMetadata({
  params: { slug },
}: URLProps): Promise<Metadata> {
  const [id] = slug;
  // not found metadata
  const notFound = {
    title: `Not Found | CodeLounge`,
    openGraph: {
      title: `Not Found | CodeLounge`,
      url: `https://codelounge.vercel.app/tags/${id}`,
    },
    twitter: {
      title: `Not Found | CodeLounge`,
    },
  };

  if (id.length !== 24) {
    return notFound;
  }

  const tag = await getTagById({ tagId: id });

  if (!tag) {
    return notFound;
  }

  const keywords = await addKeywords([tag]);

  return {
    title: `${tag.name} Questions | CodeLounge`,
    description: `Questions tagged with ${tag.name}`,
    keywords: keywords,
    openGraph: {
      title: `${tag.name} Questions | CodeLounge`,
      description: `Questions tagged with ${tag.name}`,
      url: `https://codelounge.vercel.app/tags/${id}/${slugify(tag.name)}`,
    },
    twitter: {
      title: `${tag.name} Questions | CodeLounge`,
      description: `Questions tagged with ${tag.name}`,
    },
  };
}
