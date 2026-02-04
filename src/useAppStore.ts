import { create } from "zustand";

interface MyStates {
    isPostDisplayed: boolean;
    setPostDisplay: (show: boolean) => void;
}

export const useAppStore = create<MyStates>((set) => ({
    isPostDisplayed: false,
    setPostDisplay: (val) => set({isPostDisplayed: val})
}))