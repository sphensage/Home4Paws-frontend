import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, logoutUser, getProfile, signUpUser } from "./api";
import type { User } from "./api";

// ----------------------------
// Auth Context Type
// ----------------------------
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    birthdate: string;
  }) => Promise<{ success: boolean; message?: string; errors?: any }>;
  checkAuth: () => Promise<void>;
}

// ----------------------------
// Create Context
// ----------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------
// Auth Provider Component
// ----------------------------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----------------------------
  // Check if user is already authenticated (on app mount)
  // ----------------------------
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProfile();
      if (result.success && result.user) {
        setUser(result.user);
        console.log("Session restored for:", result.user.name);
      } else {
        setUser(null);
        console.log("No active session found");
      }
    } catch (err) {
      setUser(null);
      console.log("Auth check failed");
    } finally {
      setLoading(false);
    }
  }, []);

  // ----------------------------
  // Check auth status when app mounts
  // ----------------------------
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ----------------------------
  // Login function
  // ----------------------------
  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        console.log("Logged in as:", result.user.name);
        return { success: true };
      } else {
        setError(result.message || "Login failed");
        return { success: false, message: result.message };
      }
    } catch (err: any) {
      const message = err.message || "Login failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Signup function
  // ----------------------------
  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    birthdate: string;
  }) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signUpUser(userData);
      if (result.success && result.user) {
        setUser(result.user);
        console.log("Registered and logged in as:", result.user.name);
        return { success: true };
      } else {
        setError(result.message || "Registration failed");
        return { success: false, message: result.message, errors: (result as any).errors };
      }
    } catch (err: any) {
      const message = err.message || "Registration failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Logout function
  // ----------------------------
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        signup,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ----------------------------
// Hook to use auth context
// ----------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};