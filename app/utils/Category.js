import API from "./axios";

/**
 * Get all categories
 * GET /categories
 */
export const getCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};

/**
 * Get a single category by ID
 * GET /categories/:id
 * @param {number|string} id
 */
export const getCategoryById = async (id) => {
  const response = await API.get(`/categories/${id}`);
  return response.data;
};

/**
 * Create a new category
 * POST /categories
 * @param {Object} categoryData
 */
export const createCategory = async (categoryData) => {
  const response = await API.post("/categories", categoryData);
  return response.data;
};

/**
 * Update an existing category by ID
 * PUT /categories/:id
 * @param {number|string} id
 * @param {Object} categoryData
 */
export const updateCategory = async (id, categoryData) => {
  const response = await API.put(`/categories/${id}`, categoryData);
  return response.data;
};

/**
 * Delete a category by ID
 * DELETE /categories/:id
 * @param {number|string} id
 */
export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};