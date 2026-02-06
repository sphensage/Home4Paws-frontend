import { useEffect } from "react";
import HomePageNavbar from "../forms/new/HomePageNavbar";
import HomePageContents from "../forms/new/HomePageContents";
import { SuccessToast } from "../SuccessToast";
import { useAppStore } from "../useAppStore"; 

const HomePage = () => {
  const activeTab = useAppStore(state => state.activeTab);
  const fetchInbox = useAppStore(state => state.fetchInboxNotifications);
  const fetchHomePaws = useAppStore(state => state.fetchHomePaws);
  const checkAuthStatus = useAppStore(state => state.checkAuthStatus); 
  const searchQuery = useAppStore(state => state.searchQuery);
  const selectedCity = useAppStore(state => state.selectedCity);

  // 1. Check Auth once on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // 2. Combined Watcher for Tab Switching and Searching
  useEffect(() => {
    if (activeTab === "inbox") {
      // Fetch inbox immediately when tab is switched to inbox
      fetchInbox();
    } else if (activeTab === "home" || activeTab === "featured" || activeTab === "trending") {
      // Debounce the pet fetching for home/featured/trending tabs
      const delayDebounceFn = setTimeout(() => {
        fetchHomePaws(1);
      }, 400);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [activeTab, searchQuery, selectedCity, fetchHomePaws, fetchInbox]);

  return (
    <>
      <SuccessToast />
      <HomePageNavbar />
      <HomePageContents />
    </>
  );
};

export default HomePage;
