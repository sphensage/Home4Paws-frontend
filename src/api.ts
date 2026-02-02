import axios from "axios";
// ----------------------------
// Backend URL
// ----------------------------
const BACKEND_URL = "https://home4paws-backend.test";
// ----------------------------
// Axios instance
// ----------------------------
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,  // Note: /api prefix for api.php routes
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
// ----------------------------
// Add Bearer token to every request
// ----------------------------
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ----------------------------
// User type
// ----------------------------
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  birthdate?: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
// ----------------------------
// Login
// ----------------------------
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email, password });
    
    // Store token in localStorage
    if (res.data.token) {
      localStorage.setItem("auth_token", res.data.token);
    }
    
    console.log("Login successful:", res.data.user.name);
    
    return {
      success: true,
      user: res.data.user as User,
      token: res.data.token,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message ?? "Login failed",
    };
  }
};
// ----------------------------
// Signup
// ----------------------------
export const signUpUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthdate?: string;
}) => {
  try {
    const res = await api.post("/register", userData);
    
    // Store token in localStorage (auto-login after register)
    if (res.data.token) {
      localStorage.setItem("auth_token", res.data.token);
    }
    
    return { 
      success: true, 
      user: res.data.user as User,
      token: res.data.token,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message ?? "Registration failed",
      errors: error.response?.data?.errors,
    };
  }
};
// ----------------------------
// Logout
// ----------------------------
export const logoutUser = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("auth_token");
    return { success: true };
  } catch (error) {
    // Remove token anyway
    localStorage.removeItem("auth_token");
    return { success: false };
  }
};
// ----------------------------
// Get Profile (verify token is valid)
// ----------------------------
export const getProfile = async (): Promise<{ success: boolean; user?: User }> => {
  try {
    // If no token, don't even try
    const token = localStorage.getItem("auth_token");
    if (!token) {
      return { success: false };
    }
    
    const res = await api.get("/profile");
    return { success: true, user: res.data.user };
  } catch (error) {
    // Token invalid or expired - remove it
    localStorage.removeItem("auth_token");
    return { success: false };
  }
};
export default api;
