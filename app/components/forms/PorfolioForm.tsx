"use client";

import { useState } from "react";
import { FiBriefcase, FiUploadCloud } from "react-icons/fi";

type PortfolioFormProps = { onClose?: () => void };

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const ImageUpload = ({
  label,
  hint,
  multiple = false,
}: {
  label: string;
  hint: string;
  multiple?: boolean;
}) => (
  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
    <FiUploadCloud className="h-7 w-7 text-indigo-500" />
    <span className="mt-3 text-sm font-semibold text-slate-700">{label}</span>
    <span className="mt-1 text-xs text-slate-400">{hint}</span>
    <input
      type="file"
      multiple={multiple}
      accept="image/png,image/jpeg,image/webp"
      className="sr-only"
    />
  </label>
);

const PorfolioForm = ({ onClose }: PortfolioFormProps) => {
  const [status, setStatus] = useState("Draft");

  return (
    <section className="mx-auto w-full max-w-6xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="font-semibold text-slate-900">
            Portfolio project details
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Add the project information and visuals for your portfolio.
          </p>
        </div>
        <div className="space-y-7 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Project title <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="title"
                placeholder="e.g. Nexa Finance"
                className={inputClass}
              />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Short description <span className="text-rose-500">*</span>
              </span>
              <textarea
                required
                name="description"
                rows={3}
                placeholder="Briefly describe this project..."
                className={`${inputClass} resize-none`}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Client name
              </span>
              <input
                name="client"
                placeholder="e.g. Acme Inc."
                className={inputClass}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </span>
              <select
                required
                name="category"
                defaultValue=""
                className={`${inputClass} bg-white`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option>Web Design</option>
                <option>Branding</option>
                <option>Mobile Apps</option>
                <option>Marketing</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Project URL
              </span>
              <input
                type="url"
                name="url"
                placeholder="https://example.com"
                className={inputClass}
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
                className={`${inputClass} bg-white`}
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Project details
              </span>
              <textarea
                name="content"
                rows={5}
                placeholder="Describe the challenge, solution, and outcome..."
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4">
              <h4 className="font-semibold text-slate-900">Project images</h4>
              <p className="mt-1 text-sm text-slate-400">
                Use high-quality images to showcase this project.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Featured image <span className="text-rose-500">*</span>
                </span>
                <ImageUpload
                  label="Upload featured image"
                  hint="PNG, JPG or WEBP up to 5MB"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">
                  Banner image
                </span>
                <ImageUpload
                  label="Upload banner image"
                  hint="Recommended: wide landscape image"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">
                  Image gallery
                </span>
                <ImageUpload
                  label="Upload gallery images"
                  hint="Select multiple PNG, JPG or WEBP images"
                  multiple
                />
              </div>
            </div>
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
            <FiBriefcase className="h-4 w-4" />
            Save project
          </button>
        </div>
      </form>
    </section>
  );
};

export default PorfolioForm;
