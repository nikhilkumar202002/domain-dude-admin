"use client";

import { useState, FormEvent } from "react";
import { FiImage, FiX } from "react-icons/fi";
import { createCategory, updateCategory } from "../../utils/Category";

export type CategoryData = {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  status: number | string;
  created_at?: string;
  updated_at?: string;
};

type CategoryFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  categoryToEdit?: CategoryData | null;
};

const CategoryForm = ({
  onClose,
  onSuccess,
  categoryToEdit,
}: CategoryFormProps) => {
  const [name, setName] = useState(categoryToEdit?.name || "");
  const [description, setDescription] = useState(
    categoryToEdit?.description || ""
  );
  const [status, setStatus] = useState<string>(
    categoryToEdit?.status !== undefined ? String(categoryToEdit.status) : "1"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      description,
      status: Number(status),
    };

    try {
      if (categoryToEdit && categoryToEdit.id) {
        await updateCategory(categoryToEdit.id, payload);
      } else {
        await createCategory(payload);
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save category. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              {categoryToEdit ? "Edit category details" : "Category details"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {categoryToEdit
                ? "Update your portfolio project category information."
                : "Create a category to organize your portfolio projects."}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>

        {error && (
          <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Category name <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Web Design"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Description
              </span>
              <textarea
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe this category..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Status
              </span>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="1">Active</option>
                <option value="0">Draft</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <FiImage className="h-4 w-4" />
            {loading
              ? "Saving..."
              : categoryToEdit
              ? "Update category"
              : "Save category"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CategoryForm;
