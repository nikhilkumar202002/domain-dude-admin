"use client";

import { useState, useEffect } from "react";
import { FiBriefcase, FiUploadCloud } from "react-icons/fi";
import { getClients } from "../../utils/client";
import { getCategories } from "../../utils/Category";

type PortfolioFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  portfolioToEdit?: any;
};

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

const PorfolioForm = ({ onClose, portfolioToEdit }: PortfolioFormProps) => {
  const [status, setStatus] = useState(portfolioToEdit?.status || "Draft");
  const [selectedClient, setSelectedClient] = useState(portfolioToEdit?.client_id || "");
  const [selectedCategory, setSelectedCategory] = useState(portfolioToEdit?.category_id || "");

  const [clients, setClients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      try {
        const [clientsRes, categoriesRes] = await Promise.all([
          getClients(),
          getCategories(),
        ]);

        const clientList = clientsRes?.data
          ? clientsRes.data
          : Array.isArray(clientsRes)
          ? clientsRes
          : [];
        const categoryList = categoriesRes?.data
          ? categoriesRes.data
          : Array.isArray(categoriesRes)
          ? categoriesRes
          : [];

        setClients(clientList);
        setCategories(categoryList);
      } catch (err) {
        console.error("Failed to load options", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="font-semibold text-slate-900">
            {portfolioToEdit ? "Edit portfolio project" : "Portfolio project details"}
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
                defaultValue={portfolioToEdit?.title || ""}
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
                defaultValue={portfolioToEdit?.description || ""}
                placeholder="Briefly describe this project..."
                className={`${inputClass} resize-none`}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Client
              </span>
              <select
                name="client_id"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="">
                  {loadingOptions ? "Loading clients..." : "-- Select a Client --"}
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </span>
              <select
                required
                name="category_id"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="">
                  {loadingOptions ? "Loading categories..." : "-- Select a Category --"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Project URL
              </span>
              <input
                type="url"
                name="url"
                defaultValue={portfolioToEdit?.url || ""}
                placeholder="https://example.com"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Project Year
              </span>
              <input
                type="number"
                name="year"
                defaultValue={portfolioToEdit?.year || new Date().getFullYear()}
                placeholder="e.g. 2026"
                min="1990"
                max="2100"
                className={inputClass}
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Status
              </span>
              <select
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Project details
              </span>
              <textarea
                name="content"
                rows={5}
                defaultValue={portfolioToEdit?.content || ""}
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
