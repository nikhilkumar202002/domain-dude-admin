"use client";

import { useState } from "react";
import { FiUploadCloud, FiUsers } from "react-icons/fi";

type ClientFormProps = { onClose?: () => void };
const inputClass = "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const ClientForm = ({ onClose }: ClientFormProps) => {
  const [status, setStatus] = useState("Active");
  return (
    <section className="mx-auto w-full max-w-4xl">
      <form className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" onSubmit={(event) => event.preventDefault()}>
        <div className="border-b border-slate-100 px-6 py-5"><h3 className="font-semibold text-slate-900">Client details</h3><p className="mt-1 text-sm text-slate-400">Add the client information and branding details.</p></div>
        <div className="space-y-7 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Client name <span className="text-rose-500">*</span></span><input required name="name" placeholder="e.g. Acme Inc." className={inputClass} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold text-slate-700">Email address <span className="text-rose-500">*</span></span><input required type="email" name="email" placeholder="hello@acme.com" className={inputClass} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold text-slate-700">Phone number</span><input type="tel" name="phone" placeholder="+1 555 123 4567" className={inputClass} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold text-slate-700">Website</span><input type="url" name="website" placeholder="https://acme.com" className={inputClass} /></label>
            <label className="space-y-2"><span className="text-sm font-semibold text-slate-700">Status</span><select name="status" value={status} onChange={(event) => setStatus(event.target.value)} className={`${inputClass} bg-white`}><option>Active</option><option>Inactive</option></select></label>
            <label className="space-y-2 sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Notes</span><textarea name="notes" rows={4} placeholder="Add any notes about this client..." className={`${inputClass} resize-none`} /></label>
          </div>
          <div className="space-y-2"><span className="text-sm font-semibold text-slate-700">Client logo</span><label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"><FiUploadCloud className="h-7 w-7 text-indigo-500" /><span className="mt-3 text-sm font-semibold text-slate-700">Upload client logo</span><span className="mt-1 text-xs text-slate-400">PNG, JPG or WEBP up to 5MB</span><input type="file" name="logo" accept="image/png,image/jpeg,image/webp" className="sr-only" /></label></div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"><FiUsers className="h-4 w-4" />Save client</button></div>
      </form>
    </section>
  );
};
export default ClientForm;
