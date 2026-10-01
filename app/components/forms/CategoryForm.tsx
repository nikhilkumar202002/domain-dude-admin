"use client";

import { useState } from "react";
import { FiImage, FiUploadCloud } from "react-icons/fi";

type CategoryFormProps = { onClose?: () => void };

const CategoryForm = ({ onClose }: CategoryFormProps) => {
  const [status, setStatus] = useState("Active");

  return (
    <section className="mx-auto w-full max-w-3xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="font-semibold text-slate-900">Category details</h3>
          <p className="mt-1 text-sm text-slate-400">
            Create a category to organize your portfolio projects.
          </p>
        </div>
        <div className="space-y-6 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Category name <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="name"
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
                placeholder="Briefly describe this category..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Status
              </span>
              <select
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option>Active</option>
                <option>Draft</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Accent color
              </span>
              <div className="flex h-[46px] items-center gap-3 rounded-xl border border-slate-200 px-3">
                <input
                  type="color"
                  defaultValue="#4f46e5"
                  className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <span className="text-sm text-slate-500">Indigo</span>
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Category image
            </span>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
              <FiUploadCloud className="h-7 w-7 text-indigo-500" />
              <span className="mt-3 text-sm font-semibold text-slate-700">
                Upload an image
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG or WEBP up to 5MB
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
              />
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <FiImage className="h-4 w-4" />
            Save category
          </button>
        </div>
      </form>
    </section>
  );
};

export default CategoryForm;
