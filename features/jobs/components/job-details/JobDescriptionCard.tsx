import { Building, Clock, Target } from "lucide-react";
import type { JobWithMatchScore } from "@/features/jobs/types/job.types";

interface JobDescriptionCardProps {
  job: JobWithMatchScore;
}

export function JobDescriptionCard({ job }: JobDescriptionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-8">
      <section>
        <h2 className="text-[18px] font-bold text-dark-green mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-wise-green rounded-full"></span>
          Job Description
        </h2>
        <div
          className="text-[14px] text-gray-800 font-medium leading-[1.6] [&>p]:mb-4 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-1.5 marker:text-wise-green [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:mb-1.5 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-dark-green [&>h1]:mb-4 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-dark-green [&>h2]:mb-3 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-dark-green [&>h3]:mb-2 [&_strong]:font-bold [&_strong]:text-dark-green [&_u]:underline decoration-wise-green/40 underline-offset-4"
          dangerouslySetInnerHTML={{
            __html: job.jobDescription || job.description || "",
          }}
        />
      </section>

      <hr className="border-gray-100" />

      <section>
        <h2 className="text-[18px] font-bold text-dark-green mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-wise-green rounded-full"></span>
          Job role
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-wise-green/10 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-dark-green" />
            </div>
            <div className="mt-0.5">
              <p className="text-[13px] text-gray-500 mb-0.5">Work location</p>
              <p className="text-[14px] font-medium text-gray-900">
                {job.jobCity || "Remote"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-wise-green/10 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-dark-green" />
            </div>
            <div className="mt-0.5">
              <p className="text-[13px] text-gray-500 mb-0.5">Department</p>
              <p className="text-[14px] font-medium text-gray-900">
                {job.industry?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-wise-green/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-dark-green" />
            </div>
            <div className="mt-0.5">
              <p className="text-[13px] text-gray-500 mb-0.5">
                Employment type
              </p>
              <p className="text-[14px] font-medium text-gray-900">
                {job.jobType}
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      <section>
        <h2 className="text-[18px] font-bold text-dark-green mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-wise-green rounded-full"></span>
          Job requirements
        </h2>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-wise-green/10 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-dark-green" />
          </div>
          <div className="mt-0.5">
            <p className="text-[13px] text-gray-500 mb-0.5">Experience</p>
            <p className="text-[14px] font-medium text-gray-900">
              {job.minExperience
                ? `Min. ${job.minExperience} year`
                : "Not specified"}
            </p>
          </div>
        </div>
      </section>

      {job.perks && job.perks.length > 0 && (
        <>
          <hr className="border-gray-100" />

          <section>
            <h2 className="text-[18px] font-bold text-dark-green mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-wise-green rounded-full"></span>
              Additional perks & benefits
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {job.perks.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-wise-green/10 text-dark-green rounded-xl text-[14px] font-medium border border-wise-green/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-wise-green"></span>
                  {perk}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <hr className="border-gray-100" />

      <section>
        <h2 className="text-[18px] font-bold text-dark-green mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-wise-green rounded-full"></span>
          About company
        </h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-wise-green/20 shadow-md shadow-wise-green/5 shrink-0 overflow-hidden">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.hiringCompany}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black text-dark-green">
                {job.hiringCompany?.[0] || "C"}
              </span>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[13px] text-gray-500 mb-0.5">Name</p>
              <p className="text-[15px] font-bold text-gray-900">
                {job.hiringCompany}
              </p>
              {job.belongingCompany &&
                job.belongingCompany !== job.hiringCompany && (
                  <p className="text-[13px] text-wise-green font-medium mt-0.5">
                    Part of {job.belongingCompany}
                  </p>
                )}
            </div>

            {job.officeAddress && (
              <div>
                <p className="text-[13px] text-gray-500 mb-0.5">Address</p>
                <p className="text-[14px] font-medium text-gray-800 leading-relaxed">
                  {job.officeAddress}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
