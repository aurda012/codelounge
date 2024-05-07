import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { getJobs } from "@/database/actions/job.action";

const LocalSearchBar = dynamic(
  () => import("@/components/shared/search/LocalSearchBar")
);
const Filter = dynamic(() => import("@/components/shared/Filter"));
const JobFilters = dynamic(() => import("@/components/shared/jobs/Filters"));
const JobCard = dynamic(() => import("@/components/cards/JobCard"));
const NoResult = dynamic(() => import("@/components/shared/NoResult"));
const Pagination = dynamic(() => import("@/components/shared/Pagination"), {
  ssr: false,
});

import { JobPageFilters } from "@/constants/filters";
import type { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getJobs({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    remote: searchParams.remote,
    page: searchParams.page ? +searchParams.page : 1,
    wage: searchParams.wage,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/jobs"
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />
        {JobPageFilters && (
          <Filter
            filters={JobPageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="hidden max-md:flex"
          />
        )}
      </div>

      <JobFilters filters={JobPageFilters} jobFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.data.length > 0 ? (
          result.data.map((jobItem: any) => (
            <JobCard
              key={jobItem.job_id}
              title={jobItem.job_title}
              description={jobItem.job_description}
              city={jobItem.job_city}
              state={jobItem.job_state}
              country={jobItem.job_country}
              requiredSkills={jobItem.job_required_skills?.slice(0, 5) || []}
              applyLink={jobItem.job_apply_link}
              employerLogo={jobItem.employer_logo}
              employerName={jobItem.employer_name}
              employerWebsite={jobItem.employer_website}
              employmentType={jobItem.job_employment_type?.toLowerCase()}
              isRemote={jobItem.job_is_remote}
              salary={{
                min: jobItem.job_min_salary,
                max: jobItem.job_max_salary,
                currency: jobItem.job_salary_currency,
                period: jobItem.job_salary_period,
              }}
              postedAt={jobItem.job_posted_at_datetime_utc}
            />
          ))
        ) : (
          <NoResult
            title="No Jobs Found"
            description="We couldn't find any jobs matching your search 🤔"
            link="/jobs"
            linkTitle="Explore Jobs"
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
};

export default Page;

export const metadata: Metadata = {
  title: "Jobs | CodeLounge",
  description:
    "Find your next job in as a software engineer. Search for jobs by title, location, and more.",
};
