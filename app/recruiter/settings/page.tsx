"use client";

import { ArrowRight, KeyRound, Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSettingsForm } from "@/features/recruiter/hooks/use-settings-form";

export default function RecruiterSettings() {
  const { form, onSubmit, handleResetPassword, isPending } = useSettingsForm();

  return (
    <div className="max-w-4xl mx-auto gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-black text-near-black flex items-center gap-2">
          <Settings className="size-6 text-wise-green" />
          Settings
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center">
                <Lock className="size-5 text-gray-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-near-black">
                  Change Password
                </h2>
                <p className="text-xs font-medium text-gray-500">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-5">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-gray-700">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-gray-700">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-11 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-gray-700">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-11 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-11 px-8 rounded-xl bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-colors font-bold text-sm shadow-sm"
                  >
                    {isPending ? "Updating..." : "Save Password"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Reset Password Card */}
        <div className="md:col-span-1">
          <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <KeyRound className="size-5 text-orange-500" />
              </div>
              <h2 className="text-base font-bold text-orange-900">
                Forgot Password?
              </h2>
            </div>

            <p className="text-sm font-medium text-orange-700/80 mb-6 leading-relaxed">
              If you do not remember your current password, you can log out and
              reset it securely using your registered email address.
            </p>

            <Button
              onClick={handleResetPassword}
              variant="outline"
              className="w-full h-11 rounded-xl border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300 transition-colors font-bold text-sm bg-white"
            >
              Reset via Email
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
