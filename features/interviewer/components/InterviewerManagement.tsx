"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useInterviewerManagement } from "../hooks/use-interviewer-management";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Trash2, UserPlus, Shield } from "lucide-react";

export default function InterviewerManagement() {
  const {
    interviewers,
    email,
    setEmail,
    department,
    setDepartment,
    password,
    setPassword,
    isSubmitting,
    handleCreate,
    deleteTargetId,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isDeleting,
  } = useInterviewerManagement();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-ink font-display">
          Interviewer Management
        </h1>
        <p className="text-muted-soft mt-1">
          Add and manage engineers or external interviewers who evaluate
          candidates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <Card className="lg:col-span-1 border-hairline shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <UserPlus className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold">
                Register Interviewer
              </CardTitle>
            </div>
            <CardDescription>
              Create credentials for an interviewer. They can sign in to view
              candidate details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="interviewer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="department"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Department / Tech Stack
                </Label>
                <Input
                  id="department"
                  type="text"
                  placeholder="e.g. Backend, Frontend, QA"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider flex items-center justify-between"
                >
                  <span>Password</span>
                  <span className="text-[10px] text-muted-soft font-normal normal-case">
                    Optional
                  </span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave empty for default (Interviewer@123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/95 text-white font-bold h-11 rounded-xl shadow-sm shadow-coral/10 mt-2"
              >
                {isSubmitting ? "Registering..." : "Add Interviewer"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Interviewer List */}
        <Card className="lg:col-span-2 border-hairline shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="border-b border-hairline pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <Shield className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold">
                Authorized Interviewers
              </CardTitle>
            </div>
            <CardDescription>
              A list of team members who are allowed to perform rounds and
              submit rubric grades.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {interviewers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <p className="text-ink font-bold text-base">
                  No interviewers added yet
                </p>
                <p className="text-muted-soft text-sm max-w-sm mt-1">
                  Add your teammates in the registration panel on the left to
                  authorize them.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-canvas border-b border-hairline">
                      <th className="p-4 text-xs font-bold text-muted-soft uppercase tracking-wider">
                        Email
                      </th>
                      <th className="p-4 text-xs font-bold text-muted-soft uppercase tracking-wider">
                        Department
                      </th>
                      <th className="p-4 text-xs font-bold text-muted-soft uppercase tracking-wider">
                        Added By
                      </th>
                      <th className="p-4 text-xs font-bold text-muted-soft uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {interviewers.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-canvas/40 transition-colors"
                      >
                        <td className="p-4 font-semibold text-ink">
                          {item.email}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-coral/10 text-coral capitalize">
                            {item.department}
                          </span>
                        </td>
                        <td className="p-4 text-muted-soft text-sm">
                          {item.createdBy}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => requestDelete(item.id)}
                            className="text-muted hover:text-red-600 hover:bg-red-50 rounded-lg h-9 w-9"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Remove interviewer"
        description="This will revoke their access and remove them from your authorized interviewers. This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
