import { create } from "zustand";

interface MyStates {
    isPostDisplayed: boolean;
    setPostDisplay: (show: boolean) => void;
    isImageDisplayed: boolean;
    setImageDisplay: (show: boolean) => void;
    selectedImageUrl: string | null; // The URL of the image clicked
    setSelectedImageUrl: (url: string | null) => void;
}

export const useAppStore = create<MyStates>((set) => ({
    // Initial Values
    isPostDisplayed: false,
    isImageDisplayed: false,
    selectedImageUrl: null, // Start with no image selected

    // Actions
    setPostDisplay: (val) => set({ isPostDisplayed: val }),
    setImageDisplay: (val) => set({ isImageDisplayed: val }),
    setSelectedImageUrl: (url) => set({ selectedImageUrl: url }),
}));

