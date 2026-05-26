import {
  ArrowRight,
  Building,
  FileText,
  Globe,
  Sparkles,
  Target,
  UserCheck,
  Video,
  Zap,
} from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { HeroSearch } from "@/components/hero-search";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";

export const metadata = {
  title: 'NextHire — Find Your Dream Job',
  description: 'Discover thousands of jobs matched to your skills and experience.',
};

export default function LandingPage() {
  const companies = [
    "Google",
    "Microsoft",
    "Meta",
    "Amazon",
    "Netflix",
    "Apple",
    "Tesla",
    "SpaceX",
    "Stripe",
    "Airbnb",
  ];

  const features = [
    {
      icon: <Sparkles className="size-6 text-wise-green" />,
      title: "Precision Matching",
      description:
        "Our advanced algorithms analyze your skills and match you with jobs where you have the highest probability of getting hired.",
    },
    {
      icon: <Target className="size-6 text-wise-green" />,
      title: "Candidate Profiling",
      description:
        "Create a dynamic, rich profile that showcases not just your experience, but your potential and cultural fit.",
    },
    {
      icon: <FileText className="size-6 text-wise-green" />,
      title: "Smart Resume Builder",
      description:
        "Automatically generate ATS-friendly resumes tailored to specific job descriptions with one click.",
    },
    {
      icon: <Zap className="size-6 text-wise-green" />,
      title: "One-Click Apply",
      description:
        "Stop filling out the same forms. Apply to thousands of curated jobs instantly with your verified profile.",
    },
    {
      icon: <Video className="size-6 text-wise-green" />,
      title: "Interview Prep",
      description:
        "Practice with our expert interview tools. Get real-time feedback on your answers, tone, and pacing.",
    },
    {
      icon: <Globe className="size-6 text-wise-green" />,
      title: "Global Reach",
      description:
        "Access remote and on-site opportunities across the globe, breaking geographical boundaries.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      username: "sarahj_product",
      image: "https://i.pravatar.cc/150?img=32",
      bio: "NextHire's precision matching completely changed my job search. I landed a senior role within two weeks!",
      stats: {
        following: 152,
        followers: 1200,
        posts: 24,
      },
    },
    {
      name: "David Chen",
      username: "davidc_swe",
      image: "https://i.pravatar.cc/150?img=11",
      bio: "The mock interview feature was a game-changer. It accurately predicted the questions I'd be asked.",
      stats: {
        following: 340,
        followers: 890,
        posts: 12,
      },
    },
    {
      name: "Elena Rodriguez",
      username: "elena_marketing",
      image: "https://i.pravatar.cc/150?img=5",
      bio: "I was struggling with ATS systems. NextHire's resume builder restructured my experience perfectly.",
      stats: {
        following: 450,
        followers: 3200,
        posts: 89,
      },
    },
  ];

  const faqs = [
    {
      question: "How does Precision Matching work?",
      answer:
        "Our platform analyzes millions of data points across job descriptions, company cultures, and successful hiring patterns to match your unique profile with roles where you have the highest probability of success.",
    },
    {
      question: "Is NextHire free for candidates?",
      answer:
        "Yes, our core features including profile creation, basic matching, and standard applications are completely free. We also offer premium tiers for advanced interview prep and priority matching.",
    },
    {
      question: "Can recruiters see my current employer?",
      answer:
        "You have full control over your privacy settings. You can choose to hide your profile from your current employer or specific companies to ensure a discreet job search.",
    },
    {
      question: "How accurate is the Smart Resume Builder?",
      answer:
        "The resume builder uses the same parsing technology as leading ATS software. It ensures your resume formatting and keywords perfectly align with what recruitment software is looking for.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] size-[600px] bg-wise-green/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] size-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      <LandingNavbar />

      <section className="pt-40 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wise-green/10 text-dark-green mb-8 border border-wise-green/20"
              >
                <span className="size-2 bg-wise-green rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Next Generation Hiring
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[48px] font-black leading-[56px] mb-6 text-gray-900 tracking-tight"
              >
                Land your dream job with{" "}
                <span className="text-wise-green">
                  precision.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] font-medium text-gray-500 mb-10 leading-[19.2px] max-w-lg"
              >
                Create a professional profile, let us match you with top
                companies, and automate your applications. Your career manager
                is here.
              </motion.p>

              <HeroSearch />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2">
                  Popular:
                </span>
                {["Remote", "MNC", "Software", "Startup", "Fortune 500"].map(
                  (tag) => (
                    <button
                      type="button"
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-wise-green/10 text-dark-green text-xs font-bold border border-wise-green/20 hover:bg-wise-green hover:text-dark-green transition-all hover:scale-105 active:scale-95"
                    >
                      {tag}
                    </button>
                  ),
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button className="w-full h-14 px-8 bg-wise-green text-dark-green rounded-xl text-lg font-black hover:scale-105 transition-transform shadow-xl shadow-wise-green/30 flex items-center gap-2 group">
                    Start Your Journey{" "}
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/recruiter/signup" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full h-14 px-8 border-2 border-gray-200 text-gray-900 rounded-xl text-lg font-black hover:border-wise-green hover:bg-wise-green/5 transition-all"
                  >
                    I'm Hiring
                  </Button>
                </Link>
              </motion.div>

              <div className="mt-10 flex items-center gap-4 text-sm font-bold text-gray-500">
                <div className="flex -gap-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Image
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      width={40}
                      height={40}
                      unoptimized
                      className="size-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  Join <span className="text-gray-900">2M+</span> candidates
                  already hired.
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-wise-green/20 to-transparent rounded-3xl -rotate-6 scale-105 blur-lg" />
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Team working"
                width={600}
                height={600}
                unoptimized
                className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full border border-gray-100"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="size-12 bg-wise-green/20 rounded-xl flex items-center justify-center">
                  <UserCheck className="size-6 text-dark-green" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400">
                    Profile Fit
                  </div>
                  <div className="text-xl font-black text-gray-900">
                    98% Fit
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 border-y border-gray-100 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
            Trusted by industry leaders
          </p>
        </div>
        <div className="flex relative w-full">
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex items-center gap-16 px-8 whitespace-nowrap"
          >
            {[…companies, …companies].map((company, idx) => (
              <div
                key={idx}
                className="text-2xl font-black text-gray-300 uppercase tracking-wider flex items-center gap-2"
              >
                <Building className="size-6 opacity-50" />
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-dark-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 size-[500px] bg-wise-green/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          <div className="text-center">
            <div className="text-5xl font-black text-wise-green mb-2">2M+</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              Active Candidates
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-wise-green mb-2">50k+</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              Jobs Posted
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-wise-green mb-2">10k+</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              Hiring Companies
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-wise-green mb-2">24/7</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              Expert Support
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-xs font-black text-dark-green mb-4 uppercase tracking-widest">
              Core Capabilities
            </h2>
            <p className="text-[32px] font-extrabold leading-[40px] text-gray-900">
              Everything you need to{" "}
              <span className="text-wise-green">
                supercharge
              </span>{" "}
              your career.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2rem] border border-gray-100 hover:border-wise-green/50 hover:shadow-2xl hover:shadow-wise-green/10 transition-all group bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 size-32 bg-wise-green/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="size-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-wise-green/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-[20px] font-black mb-4 text-gray-900 tracking-tight leading-[23px]">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-[19.2px] font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-[400px] bg-wise-green/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-xs font-black text-dark-green mb-4 uppercase tracking-widest">
              Success Stories
            </h2>
            <p className="text-[32px] font-extrabold leading-[40px] text-gray-900">
              Hear from candidates who found their{" "}
              <span className="text-wise-green">
                dream roles.
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] border border-gray-100 hover:border-wise-green/50 hover:shadow-2xl hover:shadow-wise-green/10 transition-all bg-white flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-6 right-6 text-gray-50 group-hover:text-wise-green/10 transition-colors duration-500 pointer-events-none">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.017 21L16.417 14.591V3H23V14.591L20.598 21H14.017ZM3.00391 21L5.40391 14.591V3H12V14.591L9.58491 21H3.00391Z" />
                  </svg>
                </div>

                <div className="mb-8 relative z-10">
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="size-5 text-wise-green"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[15px] text-gray-700 font-medium leading-[19.2px] tracking-tight">
                    "{testimonial.bio}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-8 border-t border-gray-50 relative z-10">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      unoptimized
                      className="size-14 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:ring-wise-green/30 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 size-5 bg-wise-green border-2 border-white rounded-full flex items-center justify-center">
                      <svg
                        className="size-3 text-dark-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-[16px] text-gray-900 tracking-tight leading-[20px]">
                      {testimonial.name}
                    </div>
                    <div className="text-[12px] font-bold text-gray-400">
                      @{testimonial.username}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-dark-green mb-4 uppercase tracking-widest">
              FAQ
            </h2>
            <p className="text-[32px] font-extrabold leading-[40px] text-gray-900">
              Got questions? We've got{" "}
              <span className="text-wise-green">
                answers.
              </span>
            </p>
          </div>
          <Accordion className="gap-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm px-2"
              >
                <AccordionTrigger className="p-6 md:p-8 font-black text-[16px] text-gray-900 hover:text-wise-green transition-colors hover:no-underline leading-[20px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel className="px-6 md:px-8 pb-8 text-[15px] text-gray-600 font-medium leading-[19.2px]">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-[32px] font-black text-white mb-6 relative z-10 leading-[40px]">
            Ready to find your next role?
          </h2>
          <p className="text-[15px] text-gray-400 font-medium mb-10 max-w-2xl mx-auto relative z-10 leading-[19.2px]">
            Join millions of candidates who are already using NextHire to
            accelerate their careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/signup">
              <Button className="w-full sm:w-auto h-14 px-10 bg-wise-green text-dark-green rounded-xl text-lg font-black hover:scale-105 transition-transform shadow-xl shadow-wise-green/20">
                Create Free Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
