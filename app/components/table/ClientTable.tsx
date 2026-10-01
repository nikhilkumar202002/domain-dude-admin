"use client";

import { useMemo, useState } from "react";
import {
  FiEdit2,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import ClientForm from "../forms/ClientForm";

type Client = {
  id: number;
  name: string;
  logo: string;
  email: string;
  projects: number;
  status: "Active" | "Inactive";
  updated: string;
};
const clients: Client[] = [
  {
    id: 1,
    name: "Nexa Finance",
    logo: "NF",
    email: "hello@nexafinance.com",
    projects: 4,
    status: "Active",
    updated: "Sep 28, 2026",
  },
  {
    id: 2,
    name: "Kite Labs",
    logo: "KL",
    email: "team@kitelabs.com",
    projects: 3,
    status: "Active",
    updated: "Sep 24, 2026",
  },
  {
    id: 3,
    name: "Northstar Studio",
    logo: "NS",
    email: "hi@northstar.studio",
    projects: 2,
    status: "Active",
    updated: "Sep 18, 2026",
  },
  {
    id: 4,
    name: "Harvest Market",
    logo: "HM",
    email: "hello@harvest.market",
    projects: 1,
    status: "Inactive",
    updated: "Sep 12, 2026",
  },
];

const ClientTable = () => {
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const filteredClients = useMemo(
    () =>
      clients.filter((client) =>
        `${client.name} ${client.email}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
      ),
    [query],
  );
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">
            Keep your client relationships organized
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Clients
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add client
        </button>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Create client">
          <button type="button" aria-label="Close client form" onClick={() => setIsFormOpen(false)} className="fixed inset-0 cursor-default" />
          <div className="relative z-10 my-4 w-full max-w-4xl sm:my-8">
            <ClientForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900">All clients</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {filteredClients.length}{" "}
              {filteredClients.length === 1 ? "client" : "clients"} found
            </p>
          </div>
          <label className="relative block w-full sm:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clients..."
              aria-label="Search clients"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Projects</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                        {client.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {client.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Client logo
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{client.email}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {client.projects}{" "}
                    {client.projects === 1 ? "project" : "projects"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${client.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{client.updated}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`Edit ${client.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${client.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${client.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <FiMoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No clients match your search.
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

export default ClientTable;
