import API from "./axios";

/**
 * Helper to construct FormData for portfolio payloads with arrays and files
 * @param {Object|FormData} data
 * @returns {FormData|Object}
 */
const preparePortfolioPayload = (data) => {
  if (data instanceof FormData) {
    return data;
  }

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (val === undefined || val === null) return;

    if (key === "category_ids" && Array.isArray(val)) {
      val.forEach((catId) => {
        formData.append("category_ids[]", catId);
      });
    } else if (key === "gallery_images" && Array.isArray(val)) {
      val.forEach((file) => {
        if (file instanceof File || file instanceof Blob) {
          formData.append("gallery_images[]", file);
        }
      });
    } else if (val instanceof File || val instanceof Blob) {
      formData.append(key, val);
    } else {
      formData.append(key, val);
    }
  });

  return formData;
};

/**
 * Get all portfolios
 * GET /portfolios
 */
export const getPortfolios = async () => {
  const response = await API.get("/portfolios");
  return response.data;
};

/**
 * Get a single portfolio item by ID
 * GET /portfolios/:id
 * @param {number|string} id
 */
export const getPortfolioById = async (id) => {
  const response = await API.get(`/portfolios/${id}`);
  return response.data;
};

/**
 * Create a new portfolio item
 * POST /portfolios
 * @param {Object|FormData} portfolioData
 */
export const createPortfolio = async (portfolioData) => {
  const payload = preparePortfolioPayload(portfolioData);
  const isFormData = payload instanceof FormData;

  const response = await API.post("/portfolios", payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return response.data;
};

/**
 * Update an existing portfolio item by ID using POST method
 * POST /portfolios/:id
 * @param {number|string} id
 * @param {Object|FormData} portfolioData
 */
export const updatePortfolio = async (id, portfolioData) => {
  const payload = preparePortfolioPayload(portfolioData);
  const isFormData = payload instanceof FormData;

  const response = await API.post(`/portfolios/${id}`, payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return response.data;
};

/**
 * Delete a portfolio item by ID
 * DELETE /portfolios/:id
 * @param {number|string} id
 */
export const deletePortfolio = async (id) => {
  const response = await API.delete(`/portfolios/${id}`);
  return response.data;
};