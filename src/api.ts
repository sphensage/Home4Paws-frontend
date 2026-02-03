import axios from "axios";

// 1. CONFIGURATION
const BACKEND_URL = "https://home4paws-backend.test";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. TYPES & INTERFACES
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

export interface PawsPhoto {
  id: number;
  paws_listing_id: number;
  photo_url: string;
  created_at: string;
}

export interface PawsReaction {
  id: number;
  paws_listing_id: number;
  user_id: number;
  created_at: string;
}

export interface PawsListing {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
  reactions_count: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  photos: PawsPhoto[];
  reactions: PawsReaction[];
}

// 3. AUTHENTICATION FUNCTIONS
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email, password });
    if (res.data.token) localStorage.setItem("auth_token", res.data.token);
    return { success: true, user: res.data.user as User, token: res.data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? "Login failed" };
  }
};

export const signUpUser = async (userData: { name: string; email: string; password: string; phone?: string; birthdate?: string; }) => {
  try {
    const res = await api.post("/register", userData);
    if (res.data.token) localStorage.setItem("auth_token", res.data.token);
    return { success: true, user: res.data.user as User, token: res.data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? "Registration failed", errors: error.response?.data?.errors };
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/logout");
  } finally {
    localStorage.removeItem("auth_token");
  }
  return { success: true };
};

export const getProfile = async (): Promise<{ success: boolean; user?: User }> => {
  try {
    const res = await api.get("/profile");
    return { success: true, user: res.data.user };
  } catch (error) {
    localStorage.removeItem("auth_token");
    return { success: false };
  }
};

// 4. PAWS / LISTING FUNCTIONS
export const createPaw = async (pawData: Partial<PawsListing>) => {
  try {
    const res = await api.post("/paws", pawData);
    return { success: true, paw: res.data.paw as PawsListing };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Failed to create post" };
  }
};

export const getPaws = async () => {
  try {
    const res = await api.get("/paws");
    return { success: true, paws: res.data.data as PawsListing[] };
  } catch (error: any) {
    return { success: false, message: "Failed to fetch posts" };
  }
};

export const getPaw = async (id: number) => {
  try {
    const res = await api.get(`/paws/${id}`);
    return { success: true, paw: res.data.data as PawsListing };
  } catch (error: any) {
    return { success: false, message: "Post not found" };
  }
};

export default api;
