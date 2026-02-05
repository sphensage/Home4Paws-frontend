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
  status: "available" | "adopted";
  location?: string;
  fb_link?: string;
  created_at: string;
  updated_at: string;
  reactions_count: number;
  user: Pick<User, 'id' | 'name' | 'email'>;
  photos: PawsPhoto[];
  reactions: PawsReaction[];
}

export interface InboxNotification {
  id: number;
  receiver_id: number;
  sender_id: number;
  paws_id: number;
  type: 'like' | 'email_copy'; // Specific types we defined
  message: string;
  is_read: boolean;
  created_at: string; // Use this for "7 minutes ago" text
  updated_at: string;
  sender: Pick<User, 'id' | 'name'>; // We use the 'with(sender:id,name)' in backend
  paws: { paws_id: number; title: string }; // We use the 'with(paws:paws_id,title)' in backend
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
export const getPaws = async (page = 1, search = "", location = "All", sort= "newest") => {
  try {
    const { data } = await api.get("/paws", {
      params: { 
        page, 
        search, 
        location: location !== "All" ? location : undefined, 
        sort: sort
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

export const createPaw = async (pawData: any) => {
  try {
    // We must use FormData to send physical files to Laravel
    const formData = new FormData();
    
    // Append text fields
    formData.append("title", pawData.title);
    formData.append("description", pawData.description);
    formData.append("location", pawData.location);
    formData.append("fb_link", pawData.fb_link);

    // Append multiple photos to the "photos[]" array expected by your Controller
    if (pawData.photos && pawData.photos.length > 0) {
      pawData.photos.forEach((file: File) => {
        formData.append("photos[]", file);
      });
    }

    const { data } = await api.post("/paws", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Overrides default JSON header
      },
    });

    return { success: true, paw: data.paw as PawsListing };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to create post" 
    };
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

export const getInboxNotifications = async () => {
  try {
    const { data } = await api.get("/inbox");
    return { success: true, notifications: data as InboxNotification[] };
  } catch {
    return { success: false, message: "Failed to fetch inbox" };
  }
};

export const getUnreadCount = async () => {
    try {
        const { data } = await api.get("/inbox/unread-count");
        return { success: true, count: data.unread_count as number };
    } catch {
        return { success: false, message: "Failed to fetch unread count" };
    }
};

export const markNotificationAsRead = async (notificationId: number) => {
    try {
        await api.post(`/inbox/${notificationId}/mark-read`);
        return { success: true };
    } catch {
        return { success: false, message: "Failed to mark as read" };
    }
};

export const logFacebookVisit = async (paws_id: number) => {
    try {
        const { data } = await api.post(`/paws/${paws_id}/visitFacebookAcc`);
        return { success: true, message: data.message };
    } catch {
        return { success: false, message: "Failed to log Facebook visit" };
    }
};


export const markAsAdopted = async (paws_id: number) => {
    try {
        const { data } = await api.patch(`/paws/${paws_id}/adopt`);
        return { success: true, message: data.message };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.message || "Failed to mark as adopted" 
        };
    }
};

export const getGlobalPawsStats = async () => {
    try {
        const { data } = await api.get('/paws/global-stats');
        // We use data.data because Laravel wraps the stats inside a 'data' object
        return { success: true, stats: data.data }; 
    } catch {
        return { success: false, message: "Failed to fetch global stats" };
    }
};

export default api;
