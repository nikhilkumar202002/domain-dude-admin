"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiExternalLink,
  FiGlobe,
  FiTag,
  FiUser,
  FiX,
} from "react-icons/fi";
import { getPortfolioById } from "../../utils/Portfolio";
import { PortfolioData } from "../forms/PorfolioForm";

type PortfolioDetailViewProps = {
  id: number | string;
  onClose?: () => void;
  onEdit?: (portfolio: PortfolioData) => void;
};

const PortfolioDetailView = ({
  id,
  onClose,
  onEdit,
}: PortfolioDetailViewProps) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPortfolioById(id);
      const data = res?.data ? res.data : res;
      setPortfolio(data);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load portfolio details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id, fetchDetail]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading project details...
        </p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-red-600">{error || "Portfolio not found."}</p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            <FiArrowLeft className="h-4 w-4" /> Go back
          </button>
        )}
      </div>
    );
  }

  const isPublished =
    portfolio.status === 1 ||
    portfolio.status === "1" ||
    portfolio.status === "Published";

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* Top Banner Image */}
      {portfolio.banner_image_url ? (
        <div className="relative h-64 w-full overflow-hidden bg-slate-900 sm:h-80">
          <img
            src={portfolio.banner_image_url}
            alt={portfolio.title}
            className="h-full w-full object-cover opacity-90 transition duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Close modal button if inside modal */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-slate-950/60 p-2 text-white backdrop-blur-md transition hover:bg-slate-950"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
                  isPublished
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                {isPublished ? "Published" : "Draft"}
              </span>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {portfolio.title}
              </h1>
            </div>

            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(portfolio)}
                className="rounded-xl bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 backdrop-blur-md hover:bg-white"
              >
                Edit project
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Header fallback if no banner image */
        <div className="flex items-center justify-between border-b border-slate-100 p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isPublished ? "Published" : "Draft"}
              </span>
              {portfolio.project_year && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  <FiCalendar className="h-3.5 w-3.5" />
                  {portfolio.project_year}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {portfolio.title}
            </h1>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
        {/* Left 2 Columns - Featured Image, Details & Gallery */}
        <div className="space-y-8 lg:col-span-2">
          {/* Featured Image display if not using banner */}
          {portfolio.featured_image_url && !portfolio.banner_image_url && (
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              <img
                src={portfolio.featured_image_url}
                alt={portfolio.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Short Description */}
          {portfolio.short_description && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Summary
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {portfolio.short_description}
              </p>
            </div>
          )}

          {/* Project Details */}
          {portfolio.details && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Project Overview & Details
              </h3>
              <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {portfolio.details}
              </div>
            </div>
          )}

          {/* Gallery Images Grid */}
          {portfolio.gallery_image_urls &&
            portfolio.gallery_image_urls.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Image Gallery ({portfolio.gallery_image_urls.length})
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {portfolio.gallery_image_urls.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(url)}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-left transition hover:opacity-90"
                    >
                      <img
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Right Column - Project Meta sidebar */}
        <div className="space-y-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
          {/* Client Details */}
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <FiUser className="h-3.5 w-3.5" /> Client
            </h4>
            {portfolio.client ? (
              <div className="mt-3 flex items-center gap-3">
                {portfolio.client.logo_url && (
                  <img
                    src={portfolio.client.logo_url}
                    alt={portfolio.client.name}
                    className="h-10 w-10 rounded-lg object-contain border border-slate-200 bg-white p-1"
                  />
                )}
                <div>
                  <p className="font-semibold text-slate-900">
                    {portfolio.client.name}
                  </p>
                  {portfolio.client.website && (
                    <a
                      href={portfolio.client.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Visit website
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-500">N/A</p>
            )}
          </div>

          {/* Categories */}
          <div className="border-t border-slate-200/60 pt-5">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <FiTag className="h-3.5 w-3.5" /> Categories
            </h4>
            {portfolio.categories && portfolio.categories.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {portfolio.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-500">None</p>
            )}
          </div>

          {/* Project Year */}
          {portfolio.project_year && (
            <div className="border-t border-slate-200/60 pt-5">
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <FiCalendar className="h-3.5 w-3.5" /> Year
              </h4>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {portfolio.project_year}
              </p>
            </div>
          )}

          {/* Project URL */}
          {portfolio.project_url && (
            <div className="border-t border-slate-200/60 pt-5">
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <FiGlobe className="h-3.5 w-3.5" /> Website
              </h4>
              <a
                href={
                  portfolio.project_url.startsWith("http")
                    ? portfolio.project_url
                    : `https://${portfolio.project_url}`
                }
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Launch Project <FiExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for Gallery Image Click */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
          >
            <FiX className="h-6 w-6" />
          </button>
          <img
            src={activeImage}
            alt="Full size gallery item"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioDetailView;
