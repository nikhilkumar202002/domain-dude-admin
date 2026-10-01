import API from "./axios";

/**
 * Get all services
 * GET /services
 */
export const getServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

/**
 * Get a single service by ID
 * GET /services/:id
 * @param {number|string} id
 */
export const getServiceById = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};

/**
 * Create a new service
 * POST /services
 * @param {Object} serviceData
 */
export const createService = async (serviceData) => {
  const response = await API.post("/services", serviceData);
  return response.data;
};

/**
 * Update an existing service by ID
 * PUT /services/:id
 * @param {number|string} id
 * @param {Object} serviceData
 */
export const updateService = async (id, serviceData) => {
  const response = await API.put(`/services/${id}`, serviceData);
  return response.data;
};

/**
 * Delete a service by ID
 * DELETE /services/:id
 * @param {number|string} id
 */
export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};
