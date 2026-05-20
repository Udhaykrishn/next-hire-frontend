"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Building2,
  ChevronRight,
  Crown,
  Edit2,
  IndianRupee,
  Layers,
  Layout,
  Plus,
  Shield,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePlansAdmin } from "@/hooks/use-plans-admin";
import { cn } from "@/lib/utils";

export default function PlansAdmin() {
  const {
    plans,
    isLoading,
    isCreating,
    setIsCreating,
    isDeploying,
    activeTab,
    setActiveTab,
    newPlan,
    setNewPlan,
    addFeature,
    updateFeature,
    removeFeature,
    handleSave,
    handleDelete,
    handleToggleStatus,
  } = usePlansAdmin();

  const getIcon = (type: string) => {
    switch (type) {
      case "zap":
        return <Zap className="w-5 h-5" />;
      case "crown":
        return <Crown className="w-5 h-5" />;
      case "shield":
        return <Shield className="w-5 h-5" />;
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
          Synchronizing Ecosystem...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-near-black/40">
              Monetization Engine
            </span>
          </div>
          <h4 className="text-xl font-black text-near-black tracking-tighter uppercase leading-none">
            Strategic <span className="text-wise-green">Subscription</span>{" "}
            Architecture
          </h4>
          <p className="text-sm font-bold text-gray-400 mt-4 max-w-xl">
            Configure and deploy high-performance pricing tiers for candidates
            and recruiters.
          </p>
        </div>
        {!isCreating && (
          <Button
            onClick={() => setIsCreating(true)}
            className="h-14 px-8 bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl shadow-near-black/10 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Architect New Tier
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCreating ? (
          <motion.div
            key="creator"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            {/* Form Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.04)] p-12 space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-wise-green/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-near-black flex items-center justify-center text-wise-green shadow-2xl shadow-near-black/20 group-hover:rotate-6 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-near-black tracking-tighter">
                      Plan Architect
                    </h2>
                    <div className="text-[10px] font-black text-wise-green uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-wise-green animate-ping" />
                      Strategic Tier Synthesis
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-near-black hover:bg-gray-50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40 ml-1">
                      Tier Designation
                    </Label>
                    <Input
                      placeholder="e.g., Candidate Pro"
                      value={newPlan.name}
                      onChange={(e) =>
                        setNewPlan({ ...newPlan, name: e.target.value })
                      }
                      className="h-16 rounded-2xl bg-white/50 border-gray-100 focus:ring-wise-green focus:border-wise-green font-bold text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40 ml-1">
                        Strategic Price (₹)
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="499"
                          value={newPlan.price}
                          onChange={(e) =>
                            setNewPlan({ ...newPlan, price: e.target.value })
                          }
                          className="h-16 pl-12 rounded-2xl bg-white/50 border-gray-100 focus:ring-wise-green focus:border-wise-green font-bold text-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40 ml-1">
                        Billing Cycle
                      </Label>
                      <select
                        value={newPlan.period}
                        onChange={(e) =>
                          setNewPlan({ ...newPlan, period: e.target.value })
                        }
                        className="w-full h-16 px-4 rounded-2xl bg-white/50 border-gray-100 focus:ring-wise-green focus:border-wise-green font-bold text-lg outline-none appearance-none cursor-pointer"
                      >
                        <option value="/month">Monthly</option>
                        <option value="/year">Yearly</option>
                        <option value="/job">Per Job</option>
                        <option value="Free">Forever Free</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40 ml-1">
                      Target Segment
                    </Label>
                    <div className="flex gap-4">
                      {["candidate", "recruiter"].map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            setNewPlan({
                              ...newPlan,
                              type: type as "candidate" | "recruiter",
                            })
                          }
                          className={cn(
                            "flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 border",
                            newPlan.type === type
                              ? "bg-near-black text-wise-green border-near-black shadow-xl"
                              : "bg-white/50 text-gray-400 border-gray-100 hover:border-gray-200",
                          )}
                        >
                          {type === "candidate" ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            <Building2 className="w-4 h-4" />
                          )}
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-near-black rounded-3xl space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-wise-green/60">
                      Tier Visual Signature
                    </Label>
                    <div className="flex gap-4">
                      {["zap", "crown", "shield", "layout"].map((icon) => (
                        <button
                          key={icon}
                          onClick={() =>
                            setNewPlan({
                              ...newPlan,
                              iconType: icon as "zap" | "crown" | "shield",
                            })
                          }
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            newPlan.iconType === icon
                              ? "bg-wise-green text-near-black scale-110 shadow-[0_0_20px_rgba(159,232,112,0.4)]"
                              : "bg-white/5 text-white/40 hover:bg-white/10",
                          )}
                        >
                          {getIcon(icon)}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() =>
                          setNewPlan({
                            ...newPlan,
                            highlight: !newPlan.highlight,
                          })
                        }
                        className={cn(
                          "w-10 h-6 rounded-full relative transition-all duration-300",
                          newPlan.highlight ? "bg-wise-green" : "bg-white/10",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                            newPlan.highlight ? "left-5" : "left-1",
                          )}
                        />
                      </button>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                        Strategic Highlight Tier
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40 ml-1">
                      Strategic Value Proposition
                    </Label>
                    <Textarea
                      placeholder="Describe the primary benefit of this tier..."
                      value={newPlan.description}
                      onChange={(e) =>
                        setNewPlan({ ...newPlan, description: e.target.value })
                      }
                      className="min-h-[120px] rounded-2xl bg-white/50 border-gray-100 focus:ring-wise-green focus:border-wise-green font-medium text-base resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between ml-1">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Core Value Drivers
                      </Label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-[9px] font-black uppercase text-wise-green hover:underline"
                      >
                        Add Metric
                      </button>
                    </div>
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {newPlan.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2 group">
                          <Input
                            placeholder={`Value driver #${idx + 1}`}
                            value={feature}
                            onChange={(e) => updateFeature(idx, e.target.value)}
                            className="h-14 rounded-xl bg-white/50 border-gray-100 focus:ring-wise-green font-bold text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="w-14 h-14 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                      >
                        <Users className="w-5 h-5 text-gray-300" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-near-black/30">
                    Targeting 45k+ Global Users
                  </span>
                </div>

                <div className="flex gap-6">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="h-16 px-12 rounded-[1.5rem] font-black text-sm uppercase tracking-widest text-gray-400 hover:text-near-black"
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isDeploying}
                    className="h-16 px-12 rounded-[1.5rem] bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] flex items-center gap-4 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] -translate-x-full"
                      animate={{ translateX: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10">
                      {isDeploying
                        ? "Deploying Tier..."
                        : "Deploy Strategic Tier"}
                    </span>
                    {isDeploying ? (
                      <Activity className="w-5 h-5 animate-spin relative z-10" />
                    ) : (
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Deployment Overlay */}
              <AnimatePresence>
                {isDeploying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-near-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="w-24 h-24 rounded-full bg-wise-green flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(159,232,112,0.3)]"
                    >
                      <TrendingUp className="w-10 h-10 text-near-black animate-pulse" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
                      Synchronizing Ecosystem
                    </h2>
                    <p className="text-gray-400 font-bold italic max-w-xs mx-auto leading-relaxed">
                      Deploying new monetization logic to global{" "}
                      <span className="text-wise-green underline decoration-wise-green/30">
                        {newPlan.type}
                      </span>{" "}
                      interfaces...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
              {["candidate", "recruiter"].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab as "candidate" | "recruiter")}
                  className={cn(
                    "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === tab
                      ? "bg-white text-near-black shadow-lg"
                      : "text-gray-400 hover:text-near-black",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Tier / Signature
                      </th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Price / Cycle
                      </th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Scale
                      </th>
                      <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Status
                      </th>
                      <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-near-black/40">
                        Strategic Tools
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {plans
                      .filter((p) => p.type.toLowerCase() === activeTab)
                      .map((plan) => (
                        <tr
                          key={plan.id}
                          className="group hover:bg-gray-50/30 transition-all"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                  plan.highlight
                                    ? "bg-near-black text-wise-green"
                                    : "bg-gray-100 text-gray-400",
                                )}
                              >
                                {getIcon(plan.iconType)}
                              </div>
                              <div>
                                <p className="text-base font-black text-near-black uppercase tracking-tight">
                                  {plan.name}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <Sparkles className="w-3 h-3 text-wise-green" />
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                    {plan.features.length} Drivers
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div>
                              <p className="text-base font-black text-near-black">
                                ₹{plan.price}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {plan.period}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="text-base font-black text-near-black">
                                {plan.subscribers?.toLocaleString()}
                              </span>
                              <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                                Active
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(plan.id, plan.status)
                              }
                              className={cn(
                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                plan.status === "Active"
                                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                              )}
                            >
                              {plan.status}
                            </button>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button
                                type="button"
                                className="p-3 bg-gray-50 text-gray-400 hover:text-near-black hover:bg-white border border-transparent hover:border-gray-100 rounded-xl transition-all"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(plan.id)}
                                className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
