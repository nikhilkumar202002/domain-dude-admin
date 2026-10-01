"use client";

import { useMemo, useState } from "react";
import CategoryForm from "../forms/CategoryForm";
import {
  FiEdit2,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

type CategoryItem = {
  id: number;
  name: string;
  description: string;
  projects: number;
  status: "Active" | "Draft";
  updated: string;
};
const initialCategories: CategoryItem[] = [
  {
    id: 1,
    name: "Web Design",
    description: "Modern websites and landing pages",
    projects: 18,
    status: "Active",
    updated: "Sep 28, 2026",
  },
  {
    id: 2,
    name: "Branding",
    description: "Identity systems and brand strategy",
    projects: 12,
    status: "Active",
    updated: "Sep 24, 2026",
  },
  {
    id: 3,
    name: "Mobile Apps",
    description: "Mobile product design and development",
    projects: 8,
    status: "Active",
    updated: "Sep 18, 2026",
  },
  {
    id: 4,
    name: "Marketing",
    description: "Campaigns, content, and growth",
    projects: 5,
    status: "Draft",
    updated: "Sep 12, 2026",
  },
];

const Category = () => {
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const categories = useMemo(
    () =>
      initialCategories.filter((category) =>
        `${category.name} ${category.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">
            Organize your portfolio projects
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Portfolio categories
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add category
        </button>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Create category">
          <button type="button" aria-label="Close category form" onClick={() => setIsFormOpen(false)} className="fixed inset-0 cursor-default" />
          <div className="relative z-10 w-full max-w-3xl"><CategoryForm onClose={() => setIsFormOpen(false)} /></div>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900">All categories</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {categories.length} categories found
            </p>
          </div>
          <label className="relative block w-full sm:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Projects</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {category.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {category.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {category.projects} projects
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${category.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {category.updated}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${category.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${category.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${category.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FiMoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No categories match your search.
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

export default Category;
