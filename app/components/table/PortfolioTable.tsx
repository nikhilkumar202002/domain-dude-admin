"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { getPortfolios, deletePortfolio } from "../../utils/Portfolio";
import { PortfolioData } from "../forms/PorfolioForm";

const PortfolioTable = () => {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPortfolios();
      const dataList = res?.data ? res.data : Array.isArray(res) ? res : [];
      setPortfolios(dataList);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load portfolio projects. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePortfolio(id);
        fetchPortfolios();
      } catch (err: any) {
        alert("Failed to delete project: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const filteredPortfolios = useMemo(() => {
    const search = query.toLowerCase().trim();
    return portfolios.filter((item) => {
      const categoryNames = item.categories
        ? item.categories.map((c) => c.name).join(" ")
        : "";
      const clientName = item.client?.name || "";
      const text = `${item.title || ""} ${item.short_description || ""} ${categoryNames} ${clientName}`.toLowerCase();
      return text.includes(search);
    });
  }, [portfolios, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">Showcase your best work</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Portfolio projects
          </h2>
        </div>
        <Link
          href="/portfolio/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add project
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900">All projects</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {filteredPortfolios.length}{" "}
              {filteredPortfolios.length === 1 ? "project" : "projects"} found
            </p>
          </div>
          <label className="relative block w-full sm:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              aria-label="Search portfolio projects"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Year</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                      <span>Loading portfolio projects...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPortfolios.map((item) => {
                const isPublished = item.status === 1 || item.status === "1" || item.status === "Published";
                const categoryNames = item.categories && item.categories.length > 0
                  ? item.categories.map((c) => c.name).join(", ")
                  : "N/A";

                return (
                  <tr key={item.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.featured_image_url ? (
                          <img
                            src={item.featured_image_url}
                            alt={item.title}
                            className="h-12 w-16 shrink-0 rounded-lg object-cover border border-slate-100 bg-white"
                          />
                        ) : (
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                            No Img
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/portfolio/${item.id}`}
                            className="font-semibold text-slate-900 hover:text-indigo-600 hover:underline"
                          >
                            {item.title}
                          </Link>
                          {item.short_description && (
                            <p className="mt-0.5 max-w-xs text-xs text-slate-400 line-clamp-1">
                              {item.short_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.client?.name || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">
                      {categoryNames}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isPublished
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {item.project_year || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/portfolio/${item.id}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                          title="View Project Details"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/portfolio/${item.id}/edit`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                          title="Edit Project"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => item.id && handleDelete(item.id, item.title)}
                          aria-label={`Delete ${item.title}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          title="Delete Project"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredPortfolios.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PortfolioTable;
