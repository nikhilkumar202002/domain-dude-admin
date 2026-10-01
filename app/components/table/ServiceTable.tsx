"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  FiEdit2,
  FiLayers,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import ServiceForm, { ServiceData } from "../forms/ServiceForm";
import { getServices, deleteService } from "../../utils/Service";

const ServiceTable = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceData | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getServices();
      const dataList = res?.data ? res.data : Array.isArray(res) ? res : [];
      setServices(dataList);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load services. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleOpenCreate = () => {
    setServiceToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (service: ServiceData) => {
    setServiceToEdit(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, serviceName: string) => {
    if (confirm(`Are you sure you want to delete service "${serviceName}"?`)) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err: any) {
        alert("Failed to delete service: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const sName = service.name || service.title || "";
      const sDesc = service.description || service.short_description || "";
      const searchStr = `${sName} ${sDesc}`.toLowerCase();
      return searchStr.includes(query.toLowerCase().trim());
    });
  }, [services, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">
            Manage services offered to clients
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Services
          </h2>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add service
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={serviceToEdit ? "Edit service" : "Create service"}
        >
          <button
            type="button"
            aria-label="Close service form"
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 cursor-default"
          />
          <div className="relative z-10 w-full max-w-3xl">
            <ServiceForm
              serviceToEdit={serviceToEdit}
              onClose={() => setIsFormOpen(false)}
              onSuccess={() => {
                fetchServices();
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
            <h3 className="font-semibold text-slate-900">All services</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"} found
            </p>
          </div>
          <label className="relative block w-full sm:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services..."
              aria-label="Search services"
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Service</th>
                <th className="px-5 py-3 font-semibold">Description</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last updated</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                      <span>Loading services...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.map((service) => {
                const serviceName = service.name || service.title || "Untitled Service";
                const serviceDesc = service.description || service.short_description || "";
                const isActive = service.status === 1 || service.status === "1" || service.status === "Active";
                const updatedDate = service.updated_at
                  ? new Date(service.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <tr key={service.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-semibold">
                          <FiLayers className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {serviceName}
                          </p>
                          {service.slug && (
                            <p className="text-xs text-slate-400">
                              /{service.slug}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 text-xs text-slate-500">
                        {serviceDesc || "—"}
                      </p>
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
                          onClick={() => handleOpenEdit(service)}
                          aria-label={`Edit ${serviceName}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => service.id && handleDelete(service.id, serviceName)}
                          aria-label={`Delete ${serviceName}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredServices.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    No services found.
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

export default ServiceTable;