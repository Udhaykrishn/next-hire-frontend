import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Building2,
  ChevronRight,
  Crown,
  IndianRupee,
  Layers,
  Layout,
  Shield,
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
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/pricing";

interface PlanFormProps {
  newPlan: Omit<PricingPlan, "id" | "subscribers" | "status">;
  setNewPlan: (
    plan: Omit<PricingPlan, "id" | "subscribers" | "status">,
  ) => void;
  addFeature: () => void;
  updateFeature: (idx: number, value: string) => void;
  removeFeature: (idx: number) => void;
  setIsCreating: (value: boolean) => void;
  handleSave: () => void;
  isDeploying: boolean;
}

export function PlanForm({
  newPlan,
  setNewPlan,
  addFeature,
  updateFeature,
  removeFeature,
  setIsCreating,
  handleSave,
  isDeploying,
}: PlanFormProps) {
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

  return (
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
                    type="button"
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
                    type="button"
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
                  type="button"
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
                  // biome-ignore lint/suspicious/noArrayIndexKey: feature text is editable and cannot be used as a key
                  <div key={`feature-${idx}`} className="flex gap-2 group">
                    <Input
                      placeholder={`Value driver #${idx + 1}`}
                      value={feature}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                      className="h-14 rounded-xl bg-white/50 border-gray-100 focus:ring-wise-green font-bold text-sm"
                    />
                    <button
                      type="button"
                      aria-label={`Remove value driver #${idx + 1}`}
                      title={`Remove value driver #${idx + 1}`}
                      onClick={() => removeFeature(idx)}
                      className="w-14 h-14 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
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
                {isDeploying ? "Deploying Tier..." : "Deploy Strategic Tier"}
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
  );
}
