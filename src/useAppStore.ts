import { create } from "zustand";
import { 
    getPaws, 
    toggleLike, 
    deletePaw, 
    getInboxNotifications, 
    getGlobalPawsStats,
    type PawsListing, 
    type User, 
    type InboxNotification 
} from "./api";

interface GlobalStats {
    total_posts: number;
    total_users: number;
    total_adopted: number;
}

interface AppState {
    // API Data
    paws: PawsListing[];
    inboxNotifications: InboxNotification[];
    loading: boolean;
    stats: GlobalStats | null;
    activePaw: PawsListing | null;
    currentPage: number;
    lastPage: number;
    searchQuery: string;
    selectedCity: string;
    user: User | null;
    filterStatus: "all" | "available" | "adopted"; // Base Filter
    
    // UI States
    isPostDisplayed: boolean;
    isImageDisplayed: boolean;
    selectedImageUrl: string | null;
    successMessage: string | null;
    unreadCount: number; 
    activeTab: string;

    // Actions
    setActivePaw: (paw: PawsListing | null) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCity: (city: string) => void;
    setFilterStatus: (status: "all" | "available" | "adopted") => void; // Fixed syntax
    setSuccessMessage: (msg: string | null) => void;
    setPostDisplay: (show: boolean) => void;
    setImageDisplay: (show: boolean) => void;
    setSelectedImageUrl: (url: string | null) => void;
    setActiveTab: (tab: string) => void;
    
    // API Actions
    fetchStats: () => Promise<void>;
    fetchInboxNotifications: () => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    fetchHomePaws: (page?: number) => Promise<void>;
    handleLike: (paws_id: number, user_id?: number) => Promise<void>;
    handleDelete: (paws_id: number) => Promise<void>;
    login: (email: string, pass: string) => Promise<boolean>;
    checkAuthStatus: () => Promise<void>; 
}

export const useAppStore = create<AppState>((set, get) => ({
    // Initial Values
    paws: [],
    inboxNotifications: [],
    loading: true,
    stats: null,
    activePaw: null,
    currentPage: 1,
    lastPage: 1,
    searchQuery: "",
    selectedCity: "All",
    filterStatus: "all", // Added initial value
    user: null, 
    isPostDisplayed: false,
    isImageDisplayed: false,
    selectedImageUrl: null,
    successMessage: null,
    unreadCount: 0, 
    activeTab: "home",

    // UI & State Actions
    setActivePaw: (paw) => set({ activePaw: paw }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCity: (city) => set({ selectedCity: city }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setPostDisplay: (val) => set({ isPostDisplayed: val }),
    setImageDisplay: (val) => set({ isImageDisplayed: val }),
    setSelectedImageUrl: (url) => set({ selectedImageUrl: url }),
    setSuccessMessage: (msg) => {
        set({ successMessage: msg });
        if (msg) setTimeout(() => set({ successMessage: null }), 3000);
    },

    // API & Data Logic
    fetchStats: async () => {
        const result = await getGlobalPawsStats();
        if (result.success) {
            set({ stats: result.stats });
        }
    },

    fetchHomePaws: async (page = 1) => {
        set({ loading: true });
        const { searchQuery, selectedCity, activeTab, filterStatus } = get();
        
        // 1. Determine Sort based on Tab
        let sortCriteria = "newest"; 
        if (activeTab === "featured") sortCriteria = "popular"; 
        else if (activeTab === "trending") sortCriteria = "trending";

        // 2. Execute API call with all filters + sort + status
        const result = await getPaws(page, searchQuery, selectedCity, 'title', sortCriteria, filterStatus);

        if (result.success && result.meta) {
            set({
                paws: result.paws,
                currentPage: result.meta.current_page,
                lastPage: result.meta.last_page,
                loading: false,
            });
        } else {
            set({ loading: false });
        }
    },

    fetchInboxNotifications: async () => {
        const result = await getInboxNotifications();
        if (result.success && result.notifications) {
            set({ inboxNotifications: result.notifications });
        }
    },

    fetchUnreadCount: async () => {
        const { getUnreadCount } = await import("./api"); 
        const res = await getUnreadCount();
        if (res.success) {
            set({ unreadCount: res.count ?? 0 });
        }
    },

    handleLike: async (paws_id, user_id) => {
        const target = get().paws.find((p) => p.paws_id === paws_id);
        if (target && Number(user_id) === Number(target.user_id)) return;
        
        const result = await toggleLike(paws_id);

        if (result.success) {
            set(state => ({
                paws: state.paws.map(p => p.paws_id === paws_id ? 
                    { ...p, reactions_count: result.reactions_count, reactions: result.reactions } : p),
                activePaw: state.activePaw?.paws_id === paws_id ? 
                    { ...state.activePaw, reactions_count: result.reactions_count, reactions: result.reactions } : null,
            }));
        }
    },
    
    handleDelete: async (paws_id) => {
        const result = await deletePaw(paws_id);
        if (result.success) {
            set(state => ({
                paws: state.paws.filter(p => p.paws_id !== paws_id),
                activePaw: null,
                isPostDisplayed: false,
            }));
            get().setSuccessMessage("Post deleted successfully! 🐾");
        }
    },

    login: async (email, pass) => {
        const { loginUser } = await import("./api");
        const res = await loginUser(email, pass);
        
        if (res.success && res.user) {
            set({ user: res.user });
            get().setSuccessMessage(`Welcome back, ${res.user.name}! 🐾`);
            return true; 
        } else {
            alert(res.message); 
            return false;
        }
    },

    checkAuthStatus: async () => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            const { getProfile } = await import("./api");
            const result = await getProfile();
            if (result.success && result.user) {
                set({ user: result.user });
            } else {
                localStorage.removeItem("auth_token");
                set({ user: null });
            }
        }
    },
}));
