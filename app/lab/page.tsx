import type { Metadata } from "next";
import { ChevronField } from "@/components/chevron-field";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <main className="h-dvh w-full">
      <ChevronField />
    </main>
  );
}
