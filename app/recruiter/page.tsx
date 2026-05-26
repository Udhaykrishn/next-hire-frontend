"use client";

import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  Globe,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { Logo } from "@/components/logo";

export default function RecruiterLandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] font-satoshi selection:bg-wise-green selection:text-dark-green relative flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 size-[800px] bg-wise-green/30 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 size-[600px] bg-wise-green/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay z-0"></div>

      {/* Recruiter Navbar */}
      <header className="relative z-50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 bg-white/80 backdrop-blur-2xl border border-gray-100 shadow-sm rounded-2xl px-6">
            <Link href="/" className="shrink-0">
              <Logo size="sm" />
            </Link>

            <div className="hidden md:flex items-center gap-x-8">
              <Link
                href="/#features"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                Contact Sales
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/recruiter/login"
                className="text-xs font-black text-gray-900 hover:text-wise-green transition-colors uppercase tracking-widest hidden sm:block"
              >
                Sign In
              </Link>
              <Link href="/recruiter/signup">
                <Button className="h-10 px-6 bg-wise-green text-dark-green rounded-xl text-xs font-black hover:bg-wise-green/90 transition-all shadow-md shadow-wise-green/10">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col">
        <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
          <div className="max-w-5xl mx-auto text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wise-green/10 text-dark-green font-bold text-sm mb-8 border border-wise-green/20"
            >
              <Sparkles className="size-4 text-wise-green" />
              <span>The Next Generation ATS is Here</span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-near-black tracking-tight leading-[1.1] mb-8"
            >
              Hire the <span className="text-wise-green">Top 1%</span> of{" "}
              <br className="hidden md:block" />
              Talent, Faster.
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Streamline your entire recruitment workflow with AI-driven
              applicant tracking, collaborative hiring tools, and powerful
              talent discovery.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/recruiter/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-wise-green text-dark-green font-black text-lg hover:bg-wise-green/90 transition-all shadow-[0_0_30px_rgba(159,232,112,0.3)] hover:scale-105 group">
                  Start Hiring Now
                  <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-wise-green hover:bg-wise-green/5 transition-all"
                >
                  Explore Features
                </Button>
              </Link>
            </m.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 border-t border-gray-100 bg-white overflow-hidden relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              Trusted by growing companies and industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black text-xl text-gray-800">
                <Globe className="size-6" /> Acme Corp
              </div>
              <div className="flex items-center gap-2 font-black text-xl text-gray-800">
                <Building2 className="size-6" /> TechFlow
              </div>
              <div className="flex items-center gap-2 font-black text-xl text-gray-800">
                <Globe className="size-6" /> Innovate Inc
              </div>
              <div className="flex items-center gap-2 font-black text-xl text-gray-800">
                <Building2 className="size-6" /> Synergy
              </div>
              <div className="flex items-center gap-2 font-black text-xl text-gray-800">
                <Globe className="size-6" /> Globex
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "2x", label: "Faster time to hire" },
                { number: "40%", label: "Reduction in cost per hire" },
                { number: "98%", label: "Client satisfaction rate" },
              ].map((stat, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100"
                >
                  <div className="text-4xl md:text-5xl font-black text-wise-green mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-6">
                Everything you need to build your dream team
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                Our platform provides end-to-end recruitment solutions designed
                specifically for modern HR teams and growing startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="size-8 text-wise-green" />,
                  title: "AI Candidate Sourcing",
                  desc: "Automatically discover perfect matches from our extensive talent pool based on skills, experience, and culture fit.",
                },
                {
                  icon: <Zap className="size-8 text-wise-green" />,
                  title: "Automated Workflows",
                  desc: "Set up smart triggers for emails, assessments, and interview scheduling to keep candidates engaged.",
                },
                {
                  icon: <Users className="size-8 text-wise-green" />,
                  title: "Collaborative Hiring",
                  desc: "Share candidate profiles, leave internal notes, and score applicants together with your entire team.",
                },
                {
                  icon: <BarChart3 className="size-8 text-wise-green" />,
                  title: "Advanced Analytics",
                  desc: "Track your recruitment funnel, identify bottlenecks, and optimize your hiring strategy with real-time data.",
                },
                {
                  icon: <Award className="size-8 text-wise-green" />,
                  title: "Skill Assessments",
                  desc: "Send tailored technical and behavioral assessments to evaluate candidates fairly and accurately.",
                },
                {
                  icon: <CheckCircle2 className="size-8 text-wise-green" />,
                  title: "Compliance Ready",
                  desc: "Built-in GDPR compliance, diversity tracking, and fair hiring guardrails out of the box.",
                },
              ].map((feature, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-wise-green/10 transition-all hover:-translate-y-1 group"
                >
                  <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-wise-green/10 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-near-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Features with Images */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-wise-green/20 blur-3xl rounded-full translate-x-4 translate-y-4"></div>
                <div className="relative bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 md:p-4 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
                    <BarChart3 className="size-16 opacity-20 mb-4" />
                    <span className="absolute">
                      ATS Dashboard Interface Placeholder
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl md:text-4xl font-black text-near-black mb-6 tracking-tight">
                  Manage your entire pipeline in one visual workspace
                </h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                  Get a bird's eye view of all your open roles, applicants, and
                  interview stages. Drag and drop candidates through custom
                  workflows designed for your team's unique hiring process.
                </p>
                <ul className="gap-y-4">
                  {[
                    "Customizable Kanban-style pipelines",
                    "Automated candidate stage progression",
                    "Real-time team collaboration notes",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-near-black font-medium"
                    >
                      <CheckCircle2 className="size-5 text-wise-green shrink-0" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-near-black mb-6 tracking-tight">
                  AI-powered screening that finds the perfect match
                </h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                  Stop wasting hours reviewing unqualified resumes. Our
                  proprietary AI analyzes experience, skills, and potential to
                  highlight the candidates who actually fit your requirements.
                </p>
                <ul className="gap-y-4">
                  {[
                    "Context-aware resume parsing",
                    "Automated skill validation",
                    "Bias-reduction algorithms",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-near-black font-medium"
                    >
                      <CheckCircle2 className="size-5 text-wise-green shrink-0" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -translate-x-4 translate-y-4"></div>
                <div className="relative bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 md:p-4 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                  <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
                    <Target className="size-16 opacity-20 mb-4" />
                    <span className="absolute">
                      Candidate Match Score UI Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-6">
                Loved by recruiters worldwide
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "NextHire completely transformed how we recruit. The AI screening saves our team literally dozens of hours every single week.",
                  name: "Sarah Jenkins",
                  title: "Head of Talent, TechFlow",
                  stars: 5,
                },
                {
                  quote:
                    "The cleanest, most intuitive ATS I've ever used. We onboarded our entire hiring team in less than a day.",
                  name: "Marcus Chen",
                  title: "VP of People, Innovate Inc",
                  stars: 5,
                },
                {
                  quote:
                    "Finally, a platform that feels built for modern companies. The automated workflows are an absolute game changer.",
                  name: "Elena Rodriguez",
                  title: "Recruiting Manager, Acme Corp",
                  stars: 5,
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-gray-50 border border-gray-100 relative hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.stars)].map((_, j) => (
                      <Star
                        key={j}
                        className="size-5 fill-wise-green text-wise-green"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed mb-8 text-lg">
                    "{review.quote}"
                  </p>
                  <div>
                    <div className="font-bold text-near-black">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-500">{review.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-bold hover:text-wise-green hover:no-underline">
                    How long does implementation take?
                  </AccordionTrigger>
                  <AccordionPanel className="text-gray-600 font-medium leading-relaxed">
                    Unlike traditional enterprise ATS platforms that take months
                    to set up, NextHire is ready to use immediately. You can
                    post your first job and start receiving applicants within 5
                    minutes of signing up.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-bold hover:text-wise-green hover:no-underline">
                    Does NextHire integrate with our current HRIS?
                  </AccordionTrigger>
                  <AccordionPanel className="text-gray-600 font-medium leading-relaxed">
                    Yes! We offer native, one-click integrations with all major
                    HRIS platforms including Workday, BambooHR, and Gusto to
                    seamlessly push candidate data once they're hired.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-bold hover:text-wise-green hover:no-underline">
                    Is the AI screening biased?
                  </AccordionTrigger>
                  <AccordionPanel className="text-gray-600 font-medium leading-relaxed">
                    Our AI models are specifically trained to ignore demographic
                    markers and focus entirely on skills, experience, and
                    project outcomes. We regularly audit our algorithms for
                    fairness and compliance.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-bold hover:text-wise-green hover:no-underline">
                    Can I add unlimited team members?
                  </AccordionTrigger>
                  <AccordionPanel className="text-gray-600 font-medium leading-relaxed">
                    Our Growth and Enterprise plans include unlimited
                    collaborator seats, so hiring managers and interviewers can
                    access the platform at no extra cost. Only recruiter/admin
                    seats are billed.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-near-black"></div>
          <div className="absolute top-0 right-0 size-[500px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              Ready to transform your hiring process?
            </h2>
            <p className="text-xl text-gray-400 font-medium mb-10 max-w-2xl mx-auto">
              Join thousands of companies using NextHire to scale their teams
              faster and smarter.
            </p>
            <Link href="/recruiter/signup">
              <Button className="h-16 px-10 rounded-full bg-wise-green text-dark-green font-black text-xl hover:bg-wise-green/90 transition-all hover:scale-105">
                Create Free Employer Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
