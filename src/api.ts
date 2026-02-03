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
  paws_id: number;
  photo_url: string;
}

export interface PawsReaction {
  id: number;
  paws_id: number;
  user_id: number;
}

export interface PawsListing {
  paws_id: number;
  user_id: number;
  title: string;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
  reactions_count: number;
  user: Pick<User, 'id' | 'name' | 'email'>;
  photos: PawsPhoto[];
  reactions: PawsReaction[];
}

// 3. AUTHENTICATION FUNCTIONS
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/login", { email, password });
    if (data.token) localStorage.setItem("auth_token", data.token);
    return { success: true, user: data.user as User, token: data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? "Login failed" };
  }
};

export const signUpUser = async (userData: any) => {
  try {
    const { data } = await api.post("/register", userData);
    if (data.token) localStorage.setItem("auth_token", data.token);
    return { success: true, user: data.user as User, token: data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? "Registration failed" };
  }
};

export const logoutUser = async () => {
  try { await api.post("/logout"); } 
  finally { localStorage.removeItem("auth_token"); }
  return { success: true };
};

export const getProfile = async (): Promise<{ success: boolean; user?: User }> => {
  try {
    const { data } = await api.get("/profile");
    return { success: true, user: data.user };
  } catch {
    localStorage.removeItem("auth_token");
    return { success: false };
  }
};

// 4. PAWS / LISTING FUNCTIONS
export const getPaws = async (page = 1, search = "", location = "All") => {
  try {
    const { data } = await api.get("/paws", {
      params: { 
        page, 
        search, 
        location: location !== "All" ? location : undefined 
      },
    });
    return {
      success: true,
      paws: data.data as PawsListing[],
      meta: {
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
      },
    };
  } catch {
    return { success: false, message: "Failed to fetch posts" };
  }
};

export const getPaw = async (id: number) => {
  try {
    const { data } = await api.get(`/paws/${id}`);
    return { success: true, paw: data.data as PawsListing };
  } catch {
    return { success: false, message: "Post not found" };
  }
};

export const createPaw = async (pawData: Partial<PawsListing>) => {
  try {
    const { data } = await api.post("/paws", pawData);
    return { success: true, paw: data.paw as PawsListing };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Failed to create post" };
  }
};

export const toggleLike = async (paws_id: number) => {
  try {
    const { data } = await api.post(`/paws/${paws_id}/like`);
    return { 
      success: true, 
      reactions_count: data.reactions_count, 
      reactions: data.reactions 
    };
  } catch {
    return { success: false };
  }
};

export const deletePaw = async (id: number) => {
  try {
    await api.delete(`/paws/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Delete failed" };
  }
};

export default api;
