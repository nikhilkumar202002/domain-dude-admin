"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { FiUploadCloud, FiUsers, FiX } from "react-icons/fi";
import { createClient, updateClient } from "../../utils/client";

export type ClientData = {
  id?: number;
  name: string;
  email: string;
  email_2?: string;
  phone?: string;
  phone_2?: string;
  website?: string;
  status: number | string;
  notes?: string;
  logo?: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
};

type ClientFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  clientToEdit?: ClientData | null;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const ClientForm = ({ onClose, onSuccess, clientToEdit }: ClientFormProps) => {
  const [name, setName] = useState(clientToEdit?.name || "");
  const [email, setEmail] = useState(clientToEdit?.email || "");
  const [email2, setEmail2] = useState(clientToEdit?.email_2 || "");
  const [phone, setPhone] = useState(clientToEdit?.phone || "");
  const [phone2, setPhone2] = useState(clientToEdit?.phone_2 || "");
  const [website, setWebsite] = useState(clientToEdit?.website || "");
  const [status, setStatus] = useState<string>(
    clientToEdit?.status !== undefined
      ? String(clientToEdit.status)
      : "1"
  );
  const [notes, setNotes] = useState(clientToEdit?.notes || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    clientToEdit?.logo_url || clientToEdit?.logo || null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (email2) formData.append("email_2", email2);
      if (phone) formData.append("phone", phone);
      if (phone2) formData.append("phone_2", phone2);
      if (website) formData.append("website", website);
      formData.append("status", status);
      if (notes) formData.append("notes", notes);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (clientToEdit && clientToEdit.id) {
        await updateClient(clientToEdit.id, formData);
      } else {
        await createClient(formData);
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save client. Please check fields and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              {clientToEdit ? "Edit client details" : "Client details"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {clientToEdit
                ? "Update client information and branding details."
                : "Add the client information and branding details."}
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

        <div className="space-y-7 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Client name <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme Inc."
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Primary Email <span className="text-rose-500">*</span>
              </span>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@acme.com"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Secondary Email (Optional)
              </span>
              <input
                type="email"
                name="email_2"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="billing@acme.com"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Primary Phone
              </span>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 8606411118"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Secondary Phone (Optional)
              </span>
              <input
                type="tel"
                name="phone_2"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                placeholder="+91 8606211119"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Website
              </span>
              <input
                type="url"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://acme.com"
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
                onChange={(e) => setStatus(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Notes
              </span>
              <textarea
                name="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this client..."
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Client logo
            </span>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
              {logoPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-16 w-16 rounded-xl object-contain border border-slate-200 bg-white p-1"
                  />
                  <span className="text-xs font-semibold text-indigo-600">
                    Click to change logo
                  </span>
                </div>
              ) : (
                <>
                  <FiUploadCloud className="h-7 w-7 text-indigo-500" />
                  <span className="mt-3 text-sm font-semibold text-slate-700">
                    Upload client logo
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP up to 5MB
                  </span>
                </>
              )}
              <input
                type="file"
                name="logo"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
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
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <FiUsers className="h-4 w-4" />
            {loading
              ? "Saving..."
              : clientToEdit
              ? "Update client"
              : "Save client"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ClientForm;
