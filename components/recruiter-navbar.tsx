import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Logo } from "@/components/logo";

export function RecruiterNavbar() {
  const navItems = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Sales", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-50 pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center h-16 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[20px] px-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group/nav">
        <Link
          href="/"
          className="shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Logo size="sm" />
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative px-4 py-2.5 group/link rounded-xl overflow-hidden"
            >
              <span className="text-xs font-bold text-gray-500 group-hover/link:text-near-black transition-colors uppercase tracking-widest relative z-10">
                {item.label}
              </span>
              <div className="absolute inset-0 bg-gray-50/80 scale-50 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-100 transition-all duration-300 ease-out z-0" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-wise-green group-hover/link:w-1/2 transition-all duration-300 ease-out z-10 rounded-t-full opacity-0 group-hover/link:opacity-100" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/recruiter/login"
            className="group/login hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-near-black transition-colors uppercase tracking-widest"
          >
            Sign In
            <ArrowRight className="w-3.5 h-3.5 group-hover/login:translate-x-1 group-hover/login:text-wise-green transition-all duration-300" />
          </Link>

          <div className="h-6 w-px bg-gray-100 hidden sm:block" />

          <Link href="/recruiter/signup">
            <Button className="h-10 px-6 bg-wise-green text-near-black rounded-xl text-xs font-black hover:bg-[#a6ec7c] transition-all duration-300 shadow-lg shadow-wise-green/20 hover:shadow-wise-green/40 hover:-translate-y-0.5 group/btn border border-[#a6ec7c]/50">
              <Sparkles className="w-3.5 h-3.5 mr-2 opacity-60 group-hover/btn:animate-pulse" />
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
