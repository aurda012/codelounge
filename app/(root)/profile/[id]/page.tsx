import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

import { getUserById, getUserInfo } from "@/database/actions/user.action";

const AnswersTab = dynamic(
  () => import("@/components/shared/profile/AnswersTab")
);
const ProfileLink = dynamic(
  () => import("@/components/shared/profile/ProfileLink")
);
const QuestionsTab = dynamic(
  () => import("@/components/shared/profile/QuestionsTab")
);
const Stats = dynamic(() => import("@/components/shared/profile/Stats"));
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getActualDateAndMonth } from "@/lib/utils";
import { URLProps } from "@/types";

const ProfileDetailPage = async ({
  params: { id },
  searchParams,
}: URLProps) => {
  const { userId: clerkId } = auth();
  const { user, totalQuestions, totalAnswers, badgeCounts, reputation } =
    await getUserInfo({
      userId: id,
    });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="user"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}
              {user.location && (
                <ProfileLink
                  imgUrl="/icons/location.svg"
                  title={user.location}
                />
              )}
              <ProfileLink
                imgUrl="/icons/calendar.svg"
                title={getActualDateAndMonth(user.joinedAt.toString())}
              />
            </div>
            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        reputation={reputation}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={badgeCounts}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionsTab
              userId={user._id}
              clerkId={clerkId}
              searchParams={searchParams}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswersTab
              userId={user._id}
              clerkId={clerkId}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileDetailPage;

export async function generateMetadata(
  { params }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const user = await getUserById({ userId: id });
  const description = `Explore the profile of ${user.name}. ${
    user.bio ? user.bio : ""
  }`;

  return {
    title: `${user.name}'s Profile | CodeLounge`,
    description,
  };
}
