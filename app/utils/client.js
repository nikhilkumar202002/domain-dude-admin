import API from "./axios";

/**
 * Helper to construct FormData if payload contains a File/Blob or if passed as plain object
 * @param {Object|FormData} data
 * @returns {FormData|Object}
 */
const preparePayload = (data) => {
  if (data instanceof FormData) {
    return data;
  }

  // Check if any property in object is a File or Blob
  const hasFile = Object.values(data).some(
    (value) => value instanceof File || value instanceof Blob
  );

  if (hasFile) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }

  return data;
};

/**
 * Get all clients
 * GET /clients
 */
export const getClients = async () => {
  const response = await API.get("/clients");
  return response.data;
};

/**
 * Get a single client by ID
 * GET /clients/:id
 * @param {number|string} id
 */
export const getClientById = async (id) => {
  const response = await API.get(`/clients/${id}`);
  return response.data;
};

/**
 * Create a new client
 * POST /clients
 * @param {Object|FormData} clientData
 */
export const createClient = async (clientData) => {
  const payload = preparePayload(clientData);
  const isFormData = payload instanceof FormData;

  const response = await API.post("/clients", payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return response.data;
};

/**
 * Update an existing client by ID using POST method
 * POST /clients/:id
 * @param {number|string} id
 * @param {Object|FormData} clientData
 */
export const updateClient = async (id, clientData) => {
  const payload = preparePayload(clientData);
  const isFormData = payload instanceof FormData;

  const response = await API.post(`/clients/${id}`, payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return response.data;
};

/**
 * Delete a client by ID
 * DELETE /clients/:id
 * @param {number|string} id
 */
export const deleteClient = async (id) => {
  const response = await API.delete(`/clients/${id}`);
  return response.data;
};