import Link from "next/link";
import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Logo size="sm" />
          </div>
          <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-xs">
            Building the future of recruitment with precision-driven
            intelligence and seamless matching.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black mb-6 text-gray-900 uppercase tracking-widest">
            Candidates
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/jobs"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Job Search
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Candidate Profiling
              </Link>
            </li>
            <li>
              <Link
                href="/jobs/status"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Job Status
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black mb-6 text-gray-900 uppercase tracking-widest">
            Recruiters
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/recruiter/signup"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                ATS Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black mb-6 text-gray-900 uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="text-sm font-medium text-gray-500 hover:text-wise-green transition-colors"
              >
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 text-center text-sm font-medium text-gray-400">
        © {new Date().getFullYear()} Next Hire. All rights reserved.
      </div>
    </footer>
  );
}
