import { Globe2, Target, Users, Zap } from "lucide-react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";

export default function AboutPage() {
  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Companies", value: "500+" },
    { label: "Jobs Posted", value: "25K+" },
    { label: "Success Rate", value: "94%" },
  ];

  const values = [
    {
      icon: <Users className="size-6 text-wise-green" />,
      title: "People First",
      description:
        "We believe in the power of human potential and prioritize matching the right talent with the right opportunity.",
    },
    {
      icon: <Globe2 className="size-6 text-wise-green" />,
      title: "Global Reach",
      description:
        "Breaking down geographical barriers to connect exceptional talent with world-class organizations worldwide.",
    },
    {
      icon: <Target className="size-6 text-wise-green" />,
      title: "Precision Matching",
      description:
        "Utilizing advanced algorithms to ensure that every connection made is highly relevant and mutually beneficial.",
    },
    {
      icon: <Zap className="size-6 text-wise-green" />,
      title: "Fast Execution",
      description:
        "Streamlining the hiring process to reduce time-to-hire without compromising on the quality of candidates.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-wise-green/30 selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-32 pb-20">
        <section className="px-4 relative mb-24">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-wise-green/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[48px] font-black text-gray-900 tracking-tight leading-[56px] mb-8">
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-wise-green">
                Future of Hiring
              </span>
            </h1>
            <p className="text-[15px] text-gray-600 font-medium leading-[19.2px] max-w-2xl mx-auto">
              At Next Hire, we're building an intelligent career ecosystem that
              bridges the gap between exceptional talent and forward-thinking
              companies.
            </p>
          </div>
        </section>

        <section className="px-4 mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center"
                >
                  <div className="text-4xl font-black text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="px-4 mb-32">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
              <div>
                <h2 className="text-xs font-black text-wise-green mb-4 uppercase tracking-widest">
                  Our Mission
                </h2>
                <h3 className="text-[32px] font-black text-white leading-[40px]">
                  To democratize access to great opportunities.
                </h3>
              </div>
              <div>
                <p className="text-[15px] text-gray-400 font-medium leading-[19.2px]">
                  We started Next Hire with a simple premise: the traditional
                  hiring process is broken. It's too slow, too biased, and too
                  frustrating for both candidates and recruiters.
                  <br />
                  <br />
                  By leveraging state-of-the-art technology and intuitive
                  design, we're building a platform that focuses on what truly
                  matters: skill, potential, and cultural fit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] font-black text-gray-900 leading-[40px]">
                Our Core Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="size-14 bg-wise-green/10 rounded-2xl flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h4 className="text-[20px] font-black text-gray-900 mb-4 leading-[23px]">
                    {value.title}
                  </h4>
                  <p className="text-[15px] text-gray-600 font-medium leading-[19.2px]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
