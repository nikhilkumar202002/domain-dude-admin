"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import PorfolioForm from "../../components/forms/PorfolioForm";

export default function CreatePortfolioPage() {
  const router = useRouter();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to Portfolios
        </Link>
      </div>

      <PorfolioForm
        onClose={() => router.push("/portfolio")}
        onSuccess={() => router.push("/portfolio")}
      />
    </section>
  );
}
