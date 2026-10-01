"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import CategoryForm, { CategoryData } from "../forms/CategoryForm";
import { getCategories, deleteCategory } from "../../utils/Category";
import {
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

const Category = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryData | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCategories();
      const dataList = res?.data ? res.data : Array.isArray(res) ? res : [];
      setCategories(dataList);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load categories. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenCreate = () => {
    setCategoryToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category: CategoryData) => {
    setCategoryToEdit(category);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err: any) {
        alert("Failed to delete category: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      `${category.name || ""} ${category.description || ""}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    );
  }, [categories, query]);

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
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add category
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={categoryToEdit ? "Edit category" : "Create category"}
        >
          <button
            type="button"
            aria-label="Close category form"
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 cursor-default"
          />
          <div className="relative z-10 w-full max-w-3xl">
            <CategoryForm
              categoryToEdit={categoryToEdit}
              onClose={() => setIsFormOpen(false)}
              onSuccess={() => {
                fetchCategories();
                setIsFormOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900">All categories</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1 ? "category" : "categories"} found
            </p>
          </div>
          <label className="relative block w-full sm:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search categories..."
              aria-label="Search categories"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sm text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                      <span>Loading categories...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.map((category) => {
                const isActive = category.status === 1 || category.status === "1" || category.status === "Active";
                const updatedDate = category.updated_at
                  ? new Date(category.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <tr key={category.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {category.name}
                      </p>
                      {category.description && (
                        <p className="mt-1 text-xs text-slate-400">
                          {category.description}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isActive ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{updatedDate}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(category)}
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => category.id && handleDelete(category.id, category.name)}
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No categories found.
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
