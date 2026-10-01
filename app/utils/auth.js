import API from "./axios";

/**
 * Login user via POST /login endpoint
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, token_type: string, user: object}>}
 */
export const loginUser = async (email, password) => {
  const response = await API.post("/login", { email, password });

  if (response.data && response.data.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  }

  return response.data;
};

/**
 * Logout user by clearing local auth storage
 */
export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

/**
 * Get current stored user object
 */
export const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Get stored authentication token
 */
export const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};