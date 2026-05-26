import { ArrowLeft, Compass, Home } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
      {/* Immersive Glowing Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-wise-green/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full bg-emerald-400/5 blur-[100px] pointer-events-none" />

      {/* Top Header Row with Logo Only */}
      <header className="w-full p-6 md:px-12 flex items-center relative z-20">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo size="md" />
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-xl w-full text-center space-y-10 bg-white/70 backdrop-blur-2xl border border-gray-100 p-10 md:p-14 rounded-[3.5rem] shadow-xl shadow-gray-200/30">
          {/* Glowing Animated Compass */}
          <div className="mx-auto size-24 rounded-[2.5rem] bg-wise-green/10 text-wise-green flex items-center justify-center border border-wise-green/20 relative shadow-lg shadow-wise-green/5 animate-bounce duration-[4000ms]">
            <Compass className="size-12 animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-0 rounded-[2.5rem] border border-wise-green/30 animate-ping opacity-25 duration-[3000ms]" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-8xl font-black tracking-tighter text-gray-900 uppercase relative select-none">
              404
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-wise-green rounded-full shadow-[0_0_12px_#97e87b]" />
            </h1>
            <h2 className="text-[22px] font-black text-gray-900 tracking-tight uppercase mt-6">
              Page or Resource Not Found
            </h2>
            <p className="text-[14px] font-bold text-gray-500 leading-relaxed max-w-md mx-auto">
              We couldn't locate this record. It might have been deleted, moved,
              or belongs to another account.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/profile"
              className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-gray-900 text-white hover:bg-black hover:shadow-lg hover:shadow-gray-900/10 transition-all text-[13px] font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="size-4" />
              Back to Profile
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-white text-gray-700 hover:bg-gray-50 transition-all text-[13px] font-black flex items-center justify-center gap-2 border border-gray-200/80 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="size-4" />
              Go Home
            </Link>
          </div>
        </div>
      </main>

      {/* Simplified Footer Copyright */}
      <footer className="w-full py-6 text-center text-xs text-gray-400 font-bold tracking-wider uppercase relative z-20">
        © {new Date().getFullYear()} NextHire. All Rights Reserved.
      </footer>
    </div>
  );
}
