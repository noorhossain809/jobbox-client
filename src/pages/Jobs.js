import React from "react";
import JobCard from "../components/reusable/JobCard";
import Loading from "../components/reusable/Loading";
import { useGetJobsQuery } from "../features/jobs/jobApi";

const Jobs = () => {
  const { data, isLoading } = useGetJobsQuery()
  console.log('data query',data)
  if (isLoading) return <div><Loading /></div>
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {/* <JobCard /> */}
      </div>
    </div>
  );
};

export default Jobs;
