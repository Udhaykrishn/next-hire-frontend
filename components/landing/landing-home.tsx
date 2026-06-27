"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  IconArrow,
  IconGlobe,
  IconInterview,
  IconMatch,
  IconOneClick,
  IconPrecision,
  IconProfile,
  IconResume,
  IconSend,
  IconSpark,
  IconUpload,
} from "@/components/landing/animated-icons";
import { HeroSearch } from "@/components/hero-search";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";
import { Button } from "@/components/animate-ui/components/buttons/button";

const UNSPLASH = "?auto=format&fit=crop&q=80";

const features = [
  {
    Icon: IconPrecision,
    title: "Precision Matching",
    description:
      "Our models read your skills, trajectory, and intent, then surface only the roles where you have a real shot.",
  },
  {
    Icon: IconProfile,
    title: "Candidate Profiling",
    description:
      "Build a living profile that shows your potential and culture fit, not just a list of past job titles.",
  },
  {
    Icon: IconResume,
    title: "Smart Resume Builder",
    description:
      "Generate an ATS-ready resume tuned to each job description, in one pass, with your own voice intact.",
  },
  {
    Icon: IconOneClick,
    title: "One-Click Apply",
    description:
      "Stop retyping the same fields. Apply to thousands of curated roles instantly from a verified profile.",
  },
  {
    Icon: IconInterview,
    title: "Interview Prep",
    description:
      "Rehearse with realistic mock interviews and get specific feedback on substance, structure, and pacing.",
  },
  {
    Icon: IconGlobe,
    title: "Global Reach",
    description:
      "Reach remote and on-site openings across markets, with the local context that makes an application land.",
  },
];

const steps = [
  {
    Icon: IconUpload,
    title: "Bring your profile",
    description:
      "Upload a resume or import from LinkedIn. We structure it into a profile recruiters can actually read.",
  },
  {
    Icon: IconMatch,
    title: "We match the fit",
    description:
      "The model scores every open role against your strengths and ranks the ones worth your time.",
  },
  {
    Icon: IconSend,
    title: "Apply with one tap",
    description:
      "Send a tailored application in seconds and track every reply from a single, calm dashboard.",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior PM, fintech",
    image: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80${UNSPLASH}&w=200`,
    quote:
      "Precision matching changed my search completely. I landed a senior role within two weeks instead of two months.",
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    image: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e${UNSPLASH}&w=200`,
    quote:
      "The mock interview tool was a game-changer. It predicted the exact questions I was asked in the final round.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Lead",
    image: `https://images.unsplash.com/photo-1544005313-94ddf0286df2${UNSPLASH}&w=200`,
    quote:
      "ATS systems kept rejecting me. The resume builder restructured my experience and the callbacks started flowing.",
  },
];

const faqs = [
  {
    question: "How does Precision Matching work?",
    answer:
      "We analyze millions of data points across job descriptions, company cultures, and successful hiring patterns to match your profile with roles where you have the highest probability of success.",
  },
  {
    question: "Is NextHire free for candidates?",
    answer:
      "Yes. Profile creation, matching, and standard applications are free. Premium tiers add advanced interview prep and priority matching.",
  },
  {
    question: "Can recruiters see my current employer?",
    answer:
      "You control your privacy. Hide your profile from your current employer or specific companies to keep your search discreet.",
  },
  {
    question: "How accurate is the Smart Resume Builder?",
    answer:
      "It uses the same parsing approach as leading ATS software, so your formatting and keywords align with what recruitment systems look for.",
  },
];

const companies = [
  "Google",
  "Microsoft",
  "Meta",
  "Amazon",
  "Netflix",
  "Apple",
  "Tesla",
  "Stripe",
  "Airbnb",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function LandingHome() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  // Parallax layers — disabled cleanly when the user prefers reduced motion.
  const heroImageY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroCardY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -70]);
  const heroBlobY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 160]);
  const showcaseY = useTransform(
    showcaseProgress,
    [0, 1],
    reduce ? [0, 0] : [60, -60],
  );

  return (
    <div className="bg-canvas text-ink">
      {/* ============================== HERO ============================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-4 pt-36 pb-24"
      >
        <motion.div
          style={{ y: heroBlobY }}
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[640px] w-[640px] rounded-full bg-coral/15 blur-[130px]"
        />
        <motion.div
          style={{ y: heroBlobY }}
          aria-hidden
          className="pointer-events-none absolute left-[12%] top-[44%] -z-10 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[120px]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-1.5 text-coral"
            >
              <IconSpark className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                Next generation hiring
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-ink sm:text-[60px]"
            >
              Land your dream job with{" "}
              <span className="italic text-coral">precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 max-w-lg text-[16px] leading-[1.6] text-body"
            >
              Build a profile that speaks for you, let the model match you with
              the right companies, and apply in a single tap. Your career
              manager, working around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8"
            >
              <HeroSearch />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <span className="mr-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-soft">
                Popular
              </span>
              {["Remote", "MNC", "Software", "Startup", "Fortune 500"].map(
                (tag) => (
                  <button
                    type="button"
                    key={tag}
                    className="rounded-full border border-hairline bg-white/60 px-4 py-1.5 text-xs font-bold text-body transition-all hover:border-coral/50 hover:bg-coral/10 hover:text-coral active:scale-95"
                  >
                    {tag}
                  </button>
                ),
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="group h-14 w-full gap-2 rounded-xl bg-coral px-8 text-[16px] font-bold text-white shadow-lg shadow-coral/25 transition-transform hover:scale-[1.02] sm:w-auto">
                  Start your journey
                  <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/recruiter/signup" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-14 w-full rounded-xl border border-hairline bg-transparent px-8 text-[16px] font-bold text-ink transition-colors hover:border-ink/40 hover:bg-surface-card sm:w-auto"
                >
                  I'm hiring
                </Button>
              </Link>
            </motion.div>

            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-muted-ink">
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <Image
                    unoptimized
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-canvas object-cover"
                  />
                ))}
              </div>
              <p>
                Join <span className="font-bold text-ink">2M+</span> candidates
                already hired.
              </p>
            </div>
          </div>

          {/* Hero artifact — parallax photo + floating match cards */}
          <div className="relative hidden lg:block">
            <motion.div style={{ y: heroImageY }} className="relative">
              <div className="absolute -inset-4 -z-10 rotate-3 rounded-[28px] bg-gradient-to-tr from-coral/20 to-teal/10 blur-xl" />
              <div className="overflow-hidden rounded-[24px] border border-hairline bg-surface-card shadow-2xl shadow-ink/10">
                <Image
                  unoptimized
                  src={`https://images.unsplash.com/photo-1522071820081-009f0129c71c${UNSPLASH}&w=1100`}
                  alt="A hiring team reviewing candidates"
                  width={640}
                  height={620}
                  className="h-[600px] w-full object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              style={{ y: heroCardY }}
              animate={reduce ? undefined : { translateY: [0, -10, 0] }}
              transition={
                reduce
                  ? undefined
                  : { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
              }
              className="absolute -left-10 top-12 flex items-center gap-4 rounded-2xl border border-hairline bg-white p-4 shadow-xl shadow-ink/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral/15 text-coral">
                <IconPrecision className="h-6 w-6" weight={1.8} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-soft">
                  Profile fit
                </p>
                <p className="font-display text-2xl text-ink">98%</p>
              </div>
            </motion.div>

            <motion.div
              style={{ y: heroCardY }}
              className="absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl border border-hairline bg-navy p-4 text-on-dark shadow-xl shadow-ink/20"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success/20 text-success">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">3 new matches</p>
                <p className="text-xs text-on-dark-soft">ready to apply</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================== TRUST STRIP ========================== */}
      <section className="overflow-hidden border-y border-hairline bg-surface-soft py-10">
        <p className="mx-auto mb-6 max-w-7xl px-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-soft">
          Candidates hired into teams at
        </p>
        <div className="relative flex w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-soft to-transparent" />
          <motion.div
            animate={reduce ? undefined : { x: [0, -1100] }}
            transition={
              reduce
                ? undefined
                : { repeat: Infinity, ease: "linear", duration: 24 }
            }
            className="flex shrink-0 items-center gap-14 whitespace-nowrap px-7"
          >
            {["a", "b"].flatMap((pass) =>
              companies.map((name) => (
                <span
                  key={`${pass}-${name}`}
                  className="font-display text-2xl tracking-tight text-muted-soft/70"
                >
                  {name}
                </span>
              )),
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================= STATS ============================= */}
      <section className="relative overflow-hidden bg-navy py-24 text-on-dark">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.12] mix-blend-overlay"
        />
        <div className="pointer-events-none absolute -right-20 top-0 h-[460px] w-[460px] rounded-full bg-coral/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 md:grid-cols-4">
          {[
            { value: "2M+", label: "Active candidates" },
            { value: "50k+", label: "Jobs posted" },
            { value: "10k+", label: "Hiring companies" },
            { value: "24/7", label: "Expert support" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-5xl text-coral">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-on-dark-soft">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================== FEATURES =========================== */}
      <section id="features" className="bg-canvas px-4 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core capabilities"
            title="Everything you need to"
            accent="run a sharper search."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.article
                key={feature.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl border border-hairline bg-surface-card/60 p-8 transition-all hover:-translate-y-1 hover:border-coral/40 hover:bg-white hover:shadow-xl hover:shadow-coral/5"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white text-coral shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-coral group-hover:text-white">
                  <feature.Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-[22px] leading-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-body">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section className="border-y border-hairline bg-surface-soft px-4 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="From resume to offer in"
            accent="three deliberate steps."
          />
          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-hairline md:block"
            />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas text-coral">
                    <step.Icon className="h-7 w-7" />
                  </div>
                  <span className="font-display text-3xl text-coral/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[22px] leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-body">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PRODUCT SHOWCASE ====================== */}
      <section
        ref={showcaseRef}
        className="overflow-hidden bg-canvas px-4 py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral">
              The matching engine
            </span>
            <h2 className="mt-4 font-display text-[36px] font-normal leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px]">
              See exactly why a role fits, before you apply.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-body">
              Every match comes with a transparent breakdown: skills overlap,
              seniority, compensation, and culture signals. No black box, just a
              clear reason to spend your time, or skip.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Skill-by-skill overlap scoring",
                "Salary and seniority alignment",
                "Culture and work-style signals",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] text-body-strong"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/15 text-coral">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                    >
                      <title>Included</title>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/jobs" className="mt-9 inline-block">
              <Button className="group h-13 gap-2 rounded-xl bg-ink px-7 py-3.5 text-[15px] font-bold text-on-dark transition-transform hover:scale-[1.02]">
                Explore matched jobs
                <IconArrow className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Dark product mockup card (DESIGN.md product-mockup-card-dark) */}
          <motion.div style={{ y: showcaseY }} className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[28px] bg-coral/10 blur-2xl" />
            <div className="overflow-hidden rounded-[20px] border border-navy-elevated bg-navy p-5 text-on-dark shadow-2xl shadow-ink/20">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-coral/70" />
                <span className="h-3 w-3 rounded-full bg-amber/70" />
                <span className="h-3 w-3 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-on-dark-soft">
                  match overview
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { role: "Senior Product Designer", co: "Stripe", fit: 96 },
                  { role: "Staff Engineer, Platform", co: "Airbnb", fit: 91 },
                  { role: "Lead PM, Growth", co: "Netflix", fit: 88 },
                ].map((m, i) => (
                  <div
                    key={m.role}
                    className="rounded-xl border border-navy-elevated bg-navy-soft p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold leading-tight">
                          {m.role}
                        </p>
                        <p className="text-xs text-on-dark-soft">{m.co}</p>
                      </div>
                      <span className="font-display text-xl text-coral">
                        {m.fit}%
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-elevated">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.fit}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.15 * i,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-coral"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== CANDIDATES / RECRUITERS =================== */}
      <section className="bg-surface-soft px-4 py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <AudienceCard
            tone="cream"
            label="For candidates"
            title="A search that respects your time."
            body="Stop scrolling endless boards. Get a short list of roles worth applying to, with prep built in."
            href="/signup"
            cta="Find your next role"
            image={`https://images.unsplash.com/photo-1521737604893-d14cc237f11d${UNSPLASH}&w=900`}
          />
          <AudienceCard
            tone="navy"
            label="For recruiters"
            title="Pipelines, not piles of resumes."
            body="Surface qualified, interested candidates and let the ATS handle screening, scheduling, and follow-up."
            href="/recruiter/signup"
            cta="Start hiring"
            image={`https://images.unsplash.com/photo-1600880292089-90a7e086ee0c${UNSPLASH}&w=900`}
          />
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="bg-canvas px-4 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Success stories"
            title="Hear from candidates who found"
            accent="their dream roles."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col justify-between rounded-2xl border border-hairline bg-white p-8 shadow-sm"
              >
                <div>
                  <div
                    className="mb-5 flex gap-1 text-coral"
                    role="img"
                    aria-label="Rated 5 out of 5 stars"
                  >
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg
                        key={s}
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.83-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12L2.5 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69L9.05 2.93z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-[1.6] text-body-strong">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline-soft pt-6">
                  <Image
                    unoptimized
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-ink">{t.name}</div>
                    <div className="text-xs font-medium text-muted-ink">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="border-t border-hairline bg-surface-soft px-4 py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Got questions? We've got"
            accent="answers."
          />
          <Accordion className="mt-12 space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.question}
                value={`item-${idx}`}
                className="overflow-hidden rounded-xl border border-hairline bg-white px-2"
              >
                <AccordionTrigger className="p-6 text-left font-display text-[18px] leading-tight text-ink hover:text-coral hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel className="px-6 pb-6 text-[15px] leading-[1.6] text-body">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============================ CTA BAND =========================== */}
      <section className="bg-canvas px-4 py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-coral px-8 py-16 text-center text-white md:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-overlay"
          />
          <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <h2 className="relative font-display text-[34px] font-normal leading-[1.1] tracking-[-0.01em] md:text-[44px]">
            Ready to find your next role?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[16px] leading-[1.6] text-white/85">
            Join millions of candidates using NextHire to run a faster, calmer,
            more precise job search.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="h-14 w-full rounded-xl bg-canvas px-9 text-[16px] font-bold text-ink transition-transform hover:scale-[1.02] sm:w-auto">
                Create free profile
              </Button>
            </Link>
            <Link href="/recruiter/signup" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-14 w-full rounded-xl border border-white/40 bg-transparent px-9 text-[16px] font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Hire talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-coral">
        {eyebrow}
      </p>
      <h2 className="font-display text-[32px] font-normal leading-[1.12] tracking-[-0.01em] text-ink sm:text-[40px]">
        {title} <span className="italic text-coral">{accent}</span>
      </h2>
    </motion.div>
  );
}

function AudienceCard({
  tone,
  label,
  title,
  body,
  href,
  cta,
  image,
}: {
  tone: "cream" | "navy";
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
}) {
  const isNavy = tone === "navy";
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={`flex flex-col overflow-hidden rounded-[24px] border ${
        isNavy
          ? "border-navy-elevated bg-navy text-on-dark"
          : "border-hairline bg-white text-ink"
      }`}
    >
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <span
          className={`text-xs font-bold uppercase tracking-[0.2em] ${
            isNavy ? "text-coral" : "text-coral"
          }`}
        >
          {label}
        </span>
        <h3 className="mt-4 font-display text-[26px] leading-tight tracking-[-0.01em]">
          {title}
        </h3>
        <p
          className={`mt-3 text-[15px] leading-[1.6] ${
            isNavy ? "text-on-dark-soft" : "text-body"
          }`}
        >
          {body}
        </p>
        <Link href={href} className="mt-7 inline-flex">
          <Button
            className={`group h-12 gap-2 rounded-xl px-6 text-[15px] font-bold transition-transform hover:scale-[1.02] ${
              isNavy ? "bg-coral text-white" : "bg-ink text-on-dark"
            }`}
          >
            {cta}
            <IconArrow className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          unoptimized
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
