import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI } from "../lib/api";

interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (token: string) => Promise<{ success: boolean; message?: string }>;
  signup: (email: string, name: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("elevate_token");
    if (token) {
      authAPI.getMe()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("elevate_token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem("elevate_token", res.data.token);
      setUser({ _id: res.data._id, email: res.data.email, name: res.data.name, role: res.data.role });
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Invalid email or password" };
    }
  };

  const loginWithGoogle = async (token: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await authAPI.googleLogin({ token });
      localStorage.setItem("elevate_token", res.data.token);
      setUser({ _id: res.data._id, email: res.data.email, name: res.data.name, role: res.data.role });
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Google Authentication failed" };
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await authAPI.signup({ name, email, password });
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("elevate_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
