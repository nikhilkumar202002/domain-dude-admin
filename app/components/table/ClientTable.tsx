"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  FiEdit2,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import ClientForm, { ClientData } from "../forms/ClientForm";
import { getClients, deleteClient } from "../../utils/client";

const ClientTable = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<ClientData | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getClients();
      const dataList = res?.data ? res.data : Array.isArray(res) ? res : [];
      setClients(dataList);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load clients. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenCreate = () => {
    setClientToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client: ClientData) => {
    setClientToEdit(client);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteClient(id);
        fetchClients();
      } catch (err: any) {
        alert("Failed to delete client: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const searchStr = `${client.name || ""} ${client.email || ""} ${client.phone || ""} ${client.website || ""}`.toLowerCase();
      return searchStr.includes(query.toLowerCase().trim());
    });
  }, [clients, query]);

  const getInitials = (name: string) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

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
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add client
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={clientToEdit ? "Edit client" : "Create client"}
        >
          <button
            type="button"
            aria-label="Close client form"
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 cursor-default"
          />
          <div className="relative z-10 my-4 w-full max-w-4xl sm:my-8">
            <ClientForm
              clientToEdit={clientToEdit}
              onClose={() => setIsFormOpen(false)}
              onSuccess={() => {
                fetchClients();
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
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                      <span>Loading clients...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredClients.map((client) => {
                const logoUrl = client.logo_url || (client.logo && client.logo.startsWith("http") ? client.logo : null);
                const isActive = client.status === 1 || client.status === "1" || client.status === "Active";
                const updatedDate = client.updated_at
                  ? new Date(client.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <tr key={client.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={client.name}
                            className="h-10 w-10 shrink-0 rounded-xl object-contain border border-slate-100 bg-white p-1"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                            {getInitials(client.name)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">
                            {client.name}
                          </p>
                          {client.website && (
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-0.5 block text-xs text-indigo-600 hover:underline"
                            >
                              {client.website.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <div>{client.email}</div>
                      {client.email_2 && (
                        <div className="text-xs text-slate-400">{client.email_2}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <div>{client.phone || "—"}</div>
                      {client.phone_2 && (
                        <div className="text-xs text-slate-400">{client.phone_2}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{updatedDate}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(client)}
                          aria-label={`Edit ${client.name}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => client.id && handleDelete(client.id, client.name)}
                          aria-label={`Delete ${client.name}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredClients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No clients found.
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
