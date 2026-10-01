"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiImage,
  FiStar,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { getClients } from "../../utils/client";
import { getCategories } from "../../utils/Category";
import { createPortfolio, updatePortfolio } from "../../utils/Portfolio";

export type PortfolioData = {
  id?: number;
  title: string;
  short_description?: string;
  details?: string;
  client_id?: number | string;
  category_ids?: (number | string)[];
  project_url?: string;
  project_year?: string | number;
  status?: number | string;
  featured_image_url?: string;
  banner_image_url?: string;
  gallery_image_urls?: string[];
  client?: {
    id: number;
    name: string;
    website?: string;
    logo?: string;
    logo_url?: string;
  };
  categories?: { id: number; name: string }[];
};

type PortfolioFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  portfolioToEdit?: PortfolioData | null;
};

type ImageItem = {
  id: string;
  file?: File;
  url: string;
  isFeatured: boolean;
  isBanner: boolean;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const PorfolioForm = ({
  onClose,
  onSuccess,
  portfolioToEdit,
}: PortfolioFormProps) => {
  const [title, setTitle] = useState(portfolioToEdit?.title || "");
  const [shortDescription, setShortDescription] = useState(
    portfolioToEdit?.short_description || ""
  );
  const [details, setDetails] = useState(portfolioToEdit?.details || "");
  const [clientId, setClientId] = useState<string>(
    portfolioToEdit?.client_id ? String(portfolioToEdit.client_id) : ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    portfolioToEdit?.category_ids
      ? portfolioToEdit.category_ids.map(String)
      : portfolioToEdit?.categories
      ? portfolioToEdit.categories.map((c) => String(c.id))
      : []
  );
  const [projectUrl, setProjectUrl] = useState(
    portfolioToEdit?.project_url || ""
  );
  const [projectYear, setProjectYear] = useState<string>(
    portfolioToEdit?.project_year
      ? String(portfolioToEdit.project_year)
      : String(new Date().getFullYear())
  );
  const [status, setStatus] = useState<string>(
    portfolioToEdit?.status !== undefined
      ? String(portfolioToEdit.status)
      : "1"
  );

  // Unified Image Pool State
  const [images, setImages] = useState<ImageItem[]>(() => {
    const initialPool: ImageItem[] = [];
    if (portfolioToEdit?.featured_image_url) {
      initialPool.push({
        id: `feat-${Date.now()}`,
        url: portfolioToEdit.featured_image_url,
        isFeatured: true,
        isBanner: false,
      });
    }
    if (portfolioToEdit?.banner_image_url) {
      initialPool.push({
        id: `banner-${Date.now()}`,
        url: portfolioToEdit.banner_image_url,
        isFeatured: false,
        isBanner: true,
      });
    }
    if (portfolioToEdit?.gallery_image_urls) {
      portfolioToEdit.gallery_image_urls.forEach((url, idx) => {
        initialPool.push({
          id: `gal-${idx}-${Date.now()}`,
          url,
          isFeatured: false,
          isBanner: false,
        });
      });
    }
    return initialPool;
  });

  // Options
  const [clients, setClients] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Add Uploaded Files to Image Pool
  const handleMultipleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files);

      setImages((prevImages) => {
        let hasFeatured = prevImages.some((img) => img.isFeatured);
        let hasBanner = prevImages.some((img) => img.isBanner);

        const newItems: ImageItem[] = filesArr.map((file, idx) => {
          const url = URL.createObjectURL(file);
          let isFeatured = false;
          let isBanner = false;

          if (!hasFeatured) {
            isFeatured = true;
            hasFeatured = true;
          } else if (!hasBanner) {
            isBanner = true;
            hasBanner = true;
          }

          return {
            id: `upload-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
            file,
            url,
            isFeatured,
            isBanner,
          };
        });

        return [...prevImages, ...newItems];
      });

      e.target.value = "";
    }
  };

  // Set Featured Image (only one allowed)
  const setFeatured = (targetId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isFeatured: img.id === targetId,
        isBanner: img.id === targetId ? false : img.isBanner,
      }))
    );
  };

  // Set Banner Image (only one allowed)
  const setBanner = (targetId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isBanner: img.id === targetId,
        isFeatured: img.id === targetId ? false : img.isFeatured,
      }))
    );
  };

  // Remove Image
  const removeImage = (targetId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== targetId));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", shortDescription);
      if (details) formData.append("details", details);
      if (clientId) formData.append("client_id", clientId);
      if (projectUrl) formData.append("project_url", projectUrl);
      if (projectYear) formData.append("project_year", projectYear);
      formData.append("status", status);

      selectedCategories.forEach((catId) => {
        formData.append("category_ids[]", catId);
      });

      // Assign Featured, Banner, and Gallery files
      const featuredItem = images.find((img) => img.isFeatured);
      if (featuredItem && featuredItem.file) {
        formData.append("featured_image", featuredItem.file);
      }

      const bannerItem = images.find((img) => img.isBanner);
      if (bannerItem && bannerItem.file) {
        formData.append("banner_image", bannerItem.file);
      }

      // Remaining newly uploaded images become gallery images
      images.forEach((img) => {
        if (!img.isFeatured && !img.isBanner && img.file) {
          formData.append("gallery_images[]", img.file);
        }
      });

      if (portfolioToEdit && portfolioToEdit.id) {
        await updatePortfolio(portfolioToEdit.id, formData);
      } else {
        await createPortfolio(formData);
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to save portfolio project. Please check fields and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl">
      <form
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              {portfolioToEdit ? "Edit portfolio project" : "Portfolio project details"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Add project information, details, and upload media visuals.
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
                Project title <span className="text-rose-500">*</span>
              </span>
              <input
                required
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Rysa Clinic Redesign"
                className={inputClass}
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Short description <span className="text-rose-500">*</span>
              </span>
              <textarea
                required
                name="short_description"
                rows={3}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Briefly describe this project..."
                className={`${inputClass} resize-none`}
              />
            </label>

            {/* Client (Left Column) */}
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Client
              </span>
              <select
                name="client_id"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
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

            {/* Category (Right Column - Same Row) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                required={selectedCategories.length === 0}
                name="category_id"
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !selectedCategories.includes(val)) {
                    setSelectedCategories((prev) => [...prev, val]);
                  }
                }}
                className={`${inputClass} bg-white`}
              >
                <option value="">
                  {loadingOptions ? "Loading categories..." : "-- Select a Category --"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Selected Categories Badge Display Below Select Box */}
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  {selectedCategories.map((catId) => {
                    const catObj = categories.find((c) => String(c.id) === catId);
                    return (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 shadow-2xs"
                      >
                        {catObj ? catObj.name : `Category #${catId}`}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.filter((id) => id !== catId)
                            )
                          }
                          className="text-indigo-500 hover:text-indigo-900 font-bold"
                          title="Remove category"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Project URL
              </span>
              <input
                type="text"
                name="project_url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="e.g. rysaclinics.com"
                className={inputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">
                Project Year
              </span>
              <input
                type="number"
                name="project_year"
                value={projectYear}
                onChange={(e) => setProjectYear(e.target.value)}
                placeholder="e.g. 2025"
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
                onChange={(e) => setStatus(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="1">Published (Active)</option>
                <option value="0">Draft</option>
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Project details
              </span>
              <textarea
                name="details"
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the challenge, solution, and outcome..."
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>

          {/* Redesigned Image Uploader & Selection Manager */}
          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4">
              <h4 className="font-semibold text-slate-900">
                Project Images & Visuals
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Upload all project images below, then click to assign which photo is the <strong className="text-indigo-600 font-semibold">Featured Image</strong> and <strong className="text-emerald-600 font-semibold">Banner Image</strong>. Remaining photos will be saved to the gallery.
              </p>
            </div>

            {/* Central File Upload Dropzone */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
              <FiUploadCloud className="h-10 w-10 text-indigo-500" />
              <span className="mt-3 text-base font-semibold text-slate-800">
                Upload All Project Images
              </span>
              <span className="mt-1 text-xs text-slate-400">
                Select or drag multiple images (PNG, JPG, WEBP up to 5MB each)
              </span>
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleMultipleImageUpload}
                className="sr-only"
              />
            </label>

            {/* Display Uploaded Images Pool Grid */}
            {images.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Uploaded Images ({images.length})</span>
                  <span>Select Featured & Banner role below:</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((img) => {
                    return (
                      <div
                        key={img.id}
                        className={`group relative overflow-hidden rounded-2xl border bg-white p-2 shadow-xs transition ${
                          img.isFeatured
                            ? "border-2 border-indigo-600 ring-4 ring-indigo-50"
                            : img.isBanner
                            ? "border-2 border-emerald-600 ring-4 ring-emerald-50"
                            : "border-slate-200"
                        }`}
                      >
                        {/* Thumbnail Image */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                          <img
                            src={img.url}
                            alt="Uploaded project asset"
                            className="h-full w-full object-cover"
                          />

                          {/* Top Badges */}
                          <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
                            {img.isFeatured && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                                <FiStar className="h-3 w-3" /> Featured
                              </span>
                            )}
                            {img.isBanner && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                                <FiImage className="h-3 w-3" /> Banner
                              </span>
                            )}
                            {!img.isFeatured && !img.isBanner && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-900/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                                Gallery
                              </span>
                            )}
                          </div>

                          {/* Delete Action Button */}
                          <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="absolute right-2 top-2 rounded-lg bg-slate-950/60 p-1.5 text-white backdrop-blur-xs transition hover:bg-red-600 hover:text-white"
                            title="Remove image"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Assign Role Controls */}
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setFeatured(img.id)}
                            className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                              img.isFeatured
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                            }`}
                          >
                            {img.isFeatured ? "★ Featured" : "Set Featured"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setBanner(img.id)}
                            className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                              img.isBanner
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                            }`}
                          >
                            {img.isBanner ? "✓ Banner" : "Set Banner"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary helper text */}
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                  <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    <strong>Selection Status:</strong>{" "}
                    {images.some((i) => i.isFeatured) ? "1 Featured image" : "No Featured image selected"} |{" "}
                    {images.some((i) => i.isBanner) ? "1 Banner image" : "No Banner image selected"} |{" "}
                    {images.filter((i) => !i.isFeatured && !i.isBanner).length} Gallery images.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
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
            <FiBriefcase className="h-4 w-4" />
            {loading
              ? "Saving..."
              : portfolioToEdit
              ? "Update project"
              : "Save project"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PorfolioForm;
