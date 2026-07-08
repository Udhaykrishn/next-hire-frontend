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
import { Textarea } from "@/components/ui/textarea";
import { useTemplateManagement } from "../hooks/use-template-management";
import { Plus, Trash2, BookOpen, Clock, X } from "lucide-react";

export default function TemplateManagement() {
  const {
    templates,
    name,
    setName,
    description,
    setDescription,
    duration,
    setDuration,
    rubric,
    newCriterion,
    setNewCriterion,
    addCriterion,
    removeCriterion,
    isSubmitting,
    handleCreate,
    handleDelete,
  } = useTemplateManagement();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-ink font-display">
          Interview Templates
        </h1>
        <p className="text-muted-soft mt-1">
          Create structured interview rounds with standardized rubric categories
          (e.g. Coding, System Design, Communication).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Template Form */}
        <Card className="lg:col-span-1 border-hairline shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <BookOpen className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold">New Template</CardTitle>
            </div>
            <CardDescription>
              Define the duration and specific criteria that the interviewer
              must rate from 1 to 10.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Template Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Senior Frontend Assessment"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="description"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="What is this round testing?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl min-h-[80px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="duration"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Duration (Minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="45"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                  min={5}
                  required
                />
              </div>

              {/* Rubric Builder */}
              <div className="space-y-2 border-t border-hairline pt-4">
                <Label className="text-xs font-bold text-muted-soft uppercase tracking-wider">
                  Rubric Criteria
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="newCriterion"
                    type="text"
                    placeholder="e.g. Problem Solving"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                  />
                  <Button
                    type="button"
                    onClick={addCriterion}
                    className="bg-navy hover:bg-navy/95 text-white font-bold px-3 rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {rubric.map((criterion, idx) => (
                    <span
                      key={criterion}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-coral/10 text-coral"
                    >
                      {criterion}
                      <button
                        type="button"
                        onClick={() => removeCriterion(idx)}
                        className="hover:bg-coral/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/95 text-white font-bold h-11 rounded-xl shadow-sm shadow-coral/10 mt-4"
              >
                {isSubmitting ? "Creating..." : "Save Template"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Templates List */}
        <Card className="lg:col-span-2 border-hairline shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="border-b border-hairline pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <Clock className="h-4 w-4" />
              </span>
              <CardTitle className="text-lg font-bold">
                Available Templates
              </CardTitle>
            </div>
            <CardDescription>
              Selectable templates when scheduling candidate interview rounds.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {templates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-ink font-bold text-base">
                  No templates created yet
                </p>
                <p className="text-muted-soft text-sm max-w-sm mt-1">
                  Standardize your rounds by creating templates on the left.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-hairline rounded-2xl p-4 flex flex-col justify-between hover:border-coral/40 transition-colors"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-ink text-base">
                          {template.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(template.id)}
                          className="text-muted hover:text-red-600 hover:bg-red-50 rounded-lg h-8 w-8 shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {template.description && (
                        <p className="text-muted-soft text-sm mt-1.5 line-clamp-2">
                          {template.description}
                        </p>
                      )}

                      <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-ink/80 bg-canvas px-2.5 py-1 rounded-lg w-fit">
                        <Clock className="h-3.5 w-3.5 text-coral" />
                        <span>{template.duration} Minutes</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-hairline">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-soft mb-1.5">
                        Rubric Categories
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(template.rubric ?? []).map((r) => (
                          <span
                            key={r}
                            className="inline-flex px-2 py-0.5 rounded bg-canvas border border-hairline text-[11px] font-medium text-ink"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
