"use client";

import { useMemo, useState } from "react";
import {
  FiEdit2,
  FiEye,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import PorfolioForm from "../forms/PorfolioForm";

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  client: string;
  status: "Published" | "Draft";
  updated: string;
};

const initialPortfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "Nexa Finance",
    description: "A modern banking experience for growing businesses",
    category: "Web Design",
    client: "Nexa Finance",
    status: "Published",
    updated: "Sep 28, 2026",
  },
  {
    id: 2,
    title: "Kite Mobile",
    description: "A streamlined mobile app for everyday productivity",
    category: "Mobile Apps",
    client: "Kite Labs",
    status: "Published",
    updated: "Sep 24, 2026",
  },
  {
    id: 3,
    title: "Northstar Studio",
    description: "A bold visual identity for an independent creative studio",
    category: "Branding",
    client: "Northstar Studio",
    status: "Published",
    updated: "Sep 18, 2026",
  },
  {
    id: 4,
    title: "Harvest Market",
    description: "Campaign direction and e-commerce design for a food brand",
    category: "Marketing",
    client: "Harvest Market",
    status: "Draft",
    updated: "Sep 12, 2026",
  },
];

const PortfolioTable = () => {
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const portfolio = useMemo(() => {
    const search = query.toLowerCase().trim();
    return initialPortfolio.filter((item) =>
      `${item.title} ${item.description} ${item.category} ${item.client}`
        .toLowerCase()
        .includes(search),
    );
  }, [query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">Showcase your best work</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Portfolio projects
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add project
        </button>
      </div>
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Create portfolio project"
        >
          <button
            type="button"
            aria-label="Close portfolio form"
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 cursor-default"
          />
          <div className="relative z-10 my-4 w-full max-w-6xl sm:my-8">
            <PorfolioForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900">All projects</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {portfolio.length}{" "}
              {portfolio.length === 1 ? "project" : "projects"} found
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
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {portfolio.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 max-w-xs text-xs text-slate-400">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{item.client}</td>
                  <td className="px-5 py-4 text-slate-600">{item.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{item.updated}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${item.title}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit ${item.title}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${item.title}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${item.title}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FiMoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {portfolio.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No projects match your search.
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
