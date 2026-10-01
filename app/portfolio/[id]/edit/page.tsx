"use client";

import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import PorfolioForm, { PortfolioData } from "../../../components/forms/PorfolioForm";
import { getPortfolioById } from "../../../utils/Portfolio";

export default function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPortfolioById(resolvedParams.id);
      const data = res?.data ? res.data : res;
      setPortfolio(data);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load project details for editing.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    if (resolvedParams.id) {
      fetchDetail();
    }
  }, [resolvedParams.id, fetchDetail]);

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

      {loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading project data...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-red-600 shadow-xs">
          {error}
        </div>
      ) : (
        <PorfolioForm
          portfolioToEdit={portfolio}
          onClose={() => router.push("/portfolio")}
          onSuccess={() => router.push("/portfolio")}
        />
      )}
    </section>
  );
}
