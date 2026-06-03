import { Plus } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";

interface PlanHeaderProps {
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
}

export function PlanHeader({ isCreating, setIsCreating }: PlanHeaderProps) {
  return (
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
          Configure and deploy high-performance pricing tiers for candidates and
          recruiters.
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
  );
}
