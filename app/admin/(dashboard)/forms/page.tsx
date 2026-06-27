import { redirect } from "next/navigation";
import { FORM_NAV } from "@/features/admin-forms/constants/form-nav";

export default function FormsIndexPage() {
  // Land directly on the first available form so the builder + live preview
  // show immediately instead of an empty placeholder.
  const firstAvailable = FORM_NAV.flatMap((group) => group.items).find(
    (item) => item.available,
  );

  if (firstAvailable) {
    redirect(`/admin/forms/${firstAvailable.key}`);
  }

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-hairline bg-white text-center">
      <p className="text-sm font-semibold text-ink">No forms available yet</p>
    </div>
  );
}
