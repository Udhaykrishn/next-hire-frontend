import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickySaveBar({
  isVisible,
  isUpdating,
  onCancel,
  onSave,
}: {
  isVisible: boolean;
  isUpdating: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          key="save-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-near-black text-white px-5 py-3.5 rounded-[2rem] shadow-2xl shadow-near-black/30 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-300 mr-2">
              <span className="size-2 rounded-full bg-wise-green animate-pulse" />
              Editing mode
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isUpdating}
              className="h-9 px-4 rounded-2xl font-bold text-gray-300 hover:text-white hover:bg-white/10 gap-1.5"
            >
              <X className="size-3.5" />
              Discard
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              disabled={isUpdating}
              className="h-9 px-5 rounded-2xl font-black bg-wise-green text-near-black hover:bg-wise-green/90 gap-1.5 shadow-lg shadow-wise-green/30"
            >
              {isUpdating ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              {isUpdating ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
