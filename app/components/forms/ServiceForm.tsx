"use client";

import { useState, FormEvent } from "react";
import { FiLayers, FiX } from "react-icons/fi";
import { createService, updateService } from "../../utils/Service";

export type ServiceData = {
  id?: number;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  icon?: string;
  status: number | string;
  created_at?: string;
  updated_at?: string;
};

type ServiceFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  serviceToEdit?: ServiceData | null;
};

const ServiceForm = ({
  onClose,
  onSuccess,
  serviceToEdit,
}: ServiceFormProps) => {
  const [name, setName] = useState(
    serviceToEdit?.name || serviceToEdit?.title || ""
  );
  const [description, setDescription] = useState(
    serviceToEdit?.description || serviceToEdit?.short_description || ""
  );
  const [icon, setIcon] = useState(serviceToEdit?.icon || "");
  const [status, setStatus] = useState<string>(
    serviceToEdit?.status !== undefined ? String(serviceToEdit.status) : "1"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      title: name,
      description,
      short_description: description,
      icon,
      status: Number(status),
    };

    try {
      if (serviceToEdit && serviceToEdit.id) {
        await updateService(serviceToEdit.id, payload);
      } else {
        await createService(payload);
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save service. Please try again.";
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
              {serviceToEdit ? "Edit service details" : "Service details"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {serviceToEdit
                ? "Update your offered service information."
                : "Add a new service offered by your agency/company."}
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
                Service Title / Name <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Web Development, UI/UX Design, Branding"
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
                placeholder="Briefly describe what this service provides..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Icon Class / Name
              </span>
              <input
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="e.g. FiCode, FiLayers, globe"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2">
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
                <option value="0">Draft / Inactive</option>
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
            <FiLayers className="h-4 w-4" />
            {loading
              ? "Saving..."
              : serviceToEdit
              ? "Update service"
              : "Save service"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ServiceForm;
