/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface SocialLink {
  platform: string;
  url: string;
}

interface Skill {
  name: string;
  level: number;
  category?: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  featured: boolean;
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface HeroDetails {
  name: string;
  title: string;
  about: string;
  cvUrl: string;
  contactLink: string;
  heroImage: string;
  socialLinks: SocialLink[];
}

interface AboutDetails {
  bio: string;
  aboutImage: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}

interface PortfolioTwoData {
  _id?: string;
  heroDetails: HeroDetails;
  aboutDetails: AboutDetails;
  projects: Project[];
  contactInfo: ContactInfo;
  devName: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PortfolioTwoState {
  portfolio: PortfolioTwoData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createPortfolio: (
    data: Omit<PortfolioTwoData, "_id" | "createdAt" | "updatedAt">
  ) => Promise<PortfolioTwoData | null>;
  getMyPortfolio: () => Promise<PortfolioTwoData | null>;
  updatePortfolio: (
    id: string,
    data: Partial<PortfolioTwoData>
  ) => Promise<PortfolioTwoData | null>;
  deletePortfolio: (id: string) => Promise<boolean>;
  setPortfolio: (portfolio: PortfolioTwoData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const usePortfolioTwoStore = create<PortfolioTwoState>((set, get) => ({
  portfolio: null,
  isLoading: false,
  error: null,

  createPortfolio: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Creating portfolio with data:", data);

      const response = await fetch(`${API_BASE_URL}/portfolio2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create portfolio");
      }

      const result = await response.json();
      console.log("Portfolio created successfully:", result);

      set({ portfolio: result, isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error creating portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  getMyPortfolio: async () => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Fetching user's portfolio...");

      const response = await fetch(
        `${API_BASE_URL}/portfolio2/me/my-portfolio`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.log("No portfolio found for user");
          set({ portfolio: null, isLoading: false });
          return null;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch portfolio");
      }

      const result = await response.json();
      console.log("Portfolio fetched successfully:", result);

      set({ portfolio: result, isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error fetching portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  updatePortfolio: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Updating portfolio with ID:", id, "Data:", data);

      const response = await fetch(`${API_BASE_URL}/portfolio2/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update portfolio");
      }

      const result = await response.json();
      console.log("Portfolio updated successfully:", result);

      set({ portfolio: result, isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error updating portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  deletePortfolio: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Deleting portfolio with ID:", id);

      const response = await fetch(`${API_BASE_URL}/portfolio2/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete portfolio");
      }

      console.log("Portfolio deleted successfully");

      set({ portfolio: null, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("Error deleting portfolio:", error);
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  setPortfolio: (portfolio) => set({ portfolio }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default usePortfolioTwoStore;
