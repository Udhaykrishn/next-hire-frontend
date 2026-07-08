import { getRecruiterJobs } from "./features/jobs/services/job.api.ts";
console.log("running");
getRecruiterJobs().then(console.log).catch(console.error);
