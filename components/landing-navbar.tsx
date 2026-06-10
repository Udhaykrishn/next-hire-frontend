"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Search,
  User as UserIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Logo } from "@/components/logo";
import { useAuthContext } from "@/features/auth/context/auth-context";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "RECRUITER":
        return "/recruiter/dashboard";
      default:
        return "/profile";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-2xl border-b border-gray-100 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-10">
            <Link href="/" className="shrink-0">
              <Logo size="sm" />
            </Link>

            <AnimatePresence>
              {isScrolled && (
                <motion.form
                  onSubmit={handleSearch}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-full px-4 py-2 w-96 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all"
                >
                  <Search className="w-4 h-4 text-gray-400 group-focus-within:text-wise-green transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs, skills, companies..."
                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-900 placeholder:text-gray-400 font-medium"
                  />
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                href="/#features"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                Features
              </Link>

              <div className="relative group">
                <button
                  type="button"
                  className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest flex items-center gap-1"
                >
                  Services
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 before:absolute before:content-[''] before:w-full before:h-4 before:-top-4 before:left-0 z-50">
                  <Link
                    href="/jobs"
                    className="block px-5 py-3 text-xs font-bold text-gray-600 hover:text-wise-green hover:bg-gray-50/80 transition-colors"
                  >
                    Job Search
                  </Link>
                  <Link
                    href="/jobs/status"
                    className="block px-5 py-3 text-xs font-bold text-gray-600 hover:text-wise-green hover:bg-gray-50/80 transition-colors"
                  >
                    Job Status
                  </Link>
                  <Link
                    href="#"
                    className="block px-5 py-3 text-xs font-bold text-gray-600 hover:text-wise-green hover:bg-gray-50/80 transition-colors"
                  >
                    Job Prep
                  </Link>
                </div>
              </div>

              <Link
                href="/pricing"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="text-xs font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
              >
                About
              </Link>
            </div>

            <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
              {isAuthenticated ? (
                <div className="relative group">
                  <button
                    type="button"
                    aria-label="User menu"
                    title="User menu"
                    className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-gray-50 border border-gray-100 hover:border-wise-green transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-wise-green flex items-center justify-center text-dark-green font-black text-xs">
                      {user?.fullName?.charAt(0) ||
                        user?.email.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mr-2 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-[120%] right-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    <div className="px-5 py-3 border-b border-gray-50">
                      <p className="text-xs font-black text-gray-900 truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-gray-600 hover:text-wise-green hover:bg-gray-50/80 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-gray-600 hover:text-wise-green hover:bg-gray-50/80 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-black text-gray-900 hover:text-wise-green transition-colors uppercase tracking-widest"
                  >
                    Login
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="default"
                      className="h-10 px-6 bg-wise-green text-dark-green rounded-xl text-xs font-black hover:bg-wise-green/90 transition-all shadow-md shadow-wise-green/10"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
