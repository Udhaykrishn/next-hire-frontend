"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-wise-green/30 selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-32 pb-20">
        <section className="px-4 relative mb-24">
          <div className="absolute top-[-20%] left-[-10%] size-[500px] bg-wise-green/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-[48px] font-black text-gray-900 tracking-tight leading-[56px] mb-6">
              Get in <span className="text-wise-green">Touch</span>
            </h1>
            <p className="text-[15px] text-gray-600 font-medium leading-[19.2px] max-w-2xl mx-auto">
              Have questions about our platform, enterprise pricing, or
              partnership opportunities? We'd love to hear from you.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="text-[32px] font-black text-gray-900 mb-6 leading-[40px]">
                Contact Information
              </h3>
              <p className="text-[15px] text-gray-600 font-medium mb-10 leading-[19.2px]">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="gap-y-8">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-wise-green/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="size-5 text-wise-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Email
                    </h4>
                    <p className="text-lg font-bold text-gray-900">
                      hello@nexthire.ai
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      support@nexthire.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 bg-wise-green/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="size-5 text-wise-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Phone
                    </h4>
                    <p className="text-lg font-bold text-gray-900">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                      Mon-Fri from 8am to 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 bg-wise-green/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="size-5 text-wise-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Headquarters
                    </h4>
                    <p className="text-lg font-bold text-gray-900 leading-snug">
                      100 Innovation Drive
                      <br />
                      Suite 400
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="text-[20px] font-black text-gray-900 mb-8 leading-[23px]">
                Send us a message
              </h3>

              <form className="gap-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="gap-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-bold text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      aria-label="Control"
                      id="firstName"
                      type="text"
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-wise-green focus:ring-0 transition-colors font-medium outline-none"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="gap-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-bold text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      aria-label="Control"
                      id="lastName"
                      type="text"
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-wise-green focus:ring-0 transition-colors font-medium outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="gap-y-2">
                  <label
                    htmlFor="emailAddress"
                    className="text-sm font-bold text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    aria-label="Control"
                    id="emailAddress"
                    type="email"
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-wise-green focus:ring-0 transition-colors font-medium outline-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="gap-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    aria-label="Control"
                    id="message"
                    className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-wise-green focus:ring-0 transition-colors font-medium outline-none resize-none min-h-[150px]"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button className="w-full h-14 bg-gray-900 text-white rounded-xl text-lg font-black hover:bg-gray-800 transition-all">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
