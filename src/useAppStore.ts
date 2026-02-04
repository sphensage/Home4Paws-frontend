import { create } from "zustand";

interface MyStates {
    isPostDisplayed: boolean;
    setPostDisplay: (show: boolean) => void;
    isImageDisplayed: boolean;
    setImageDisplay: (show: boolean) => void;
}

export const useAppStore = create<MyStates>((set) => ({
    isPostDisplayed: false,
    setPostDisplay: (val) => set({isPostDisplayed: val}),
    isImageDisplayed: false,
    setImageDisplay: (val) => set({isImageDisplayed: val})
}))