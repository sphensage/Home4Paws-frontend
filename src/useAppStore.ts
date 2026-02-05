import { create } from "zustand";

interface MyStates {
    isPostDisplayed: boolean;
    setPostDisplay: (show: boolean) => void;
    isImageDisplayed: boolean;
    setImageDisplay: (show: boolean) => void;
    selectedImageUrl: string | null; // The URL of the image clicked
    setSelectedImageUrl: (url: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (msg: string | null) => void;
}

export const useAppStore = create<MyStates>((set) => ({
    // Initial Values
    isPostDisplayed: false,
    isImageDisplayed: false,
    selectedImageUrl: null,
    successMessage: null, // Start with no image selected

    setSuccessMessage: (msg) => {
        set({ successMessage: msg });
        // Automatically hide it after 3 seconds
        if (msg) {
            setTimeout(() => set({ successMessage: null }), 3000);
        }
    },

    // Actions
    setPostDisplay: (val) => set({ isPostDisplayed: val }),
    setImageDisplay: (val) => set({ isImageDisplayed: val }),
    setSelectedImageUrl: (url) => set({ selectedImageUrl: url }),
}));

