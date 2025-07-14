/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://profilexbackend.onrender.com/api";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Skill {
  name: string;
  level: number;
  category?: string;
  color: string;
  _id?: string;
}

interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  imageUrl?: string;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  tagline?: string;
}

interface PortfolioData {
  _id?: string;
  templateType: string;
  brandName: string;
  heroImage: string;
  title: string;
  description: string;
  sectionAbout: string;
  sectionSubtitle: string;
  aboutMeDescription: string;
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  theme: string;
  isPublic: boolean;
  customUrl?: string;
  isPasswordProtected?: boolean;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PortfolioOneState {
  portfolio: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  customLinks: any[];

  // Actions
  createPortfolio: (
    data: Omit<PortfolioData, "_id" | "createdAt" | "updatedAt">
  ) => Promise<PortfolioData | null>;
  getMyPortfolio: () => Promise<PortfolioData | null>;
  updatePortfolio: (
    id: string,
    data: Partial<PortfolioData>
  ) => Promise<PortfolioData | null>;
  deletePortfolio: (id: string) => Promise<boolean>;
  createCustomLink: (portfolioId: string, linkData: any) => Promise<any>;
  createPasswordProtectedLink: (
    portfolioId: string,
    linkData: any
  ) => Promise<any>;
  setPortfolio: (portfolio: PortfolioData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const usePortfolioOneStore = create<PortfolioOneState>((set, get) => ({
  portfolio: null,
  isLoading: false,
  error: null,
  customLinks: [],

  createPortfolio: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Creating portfolio with data:", data);

      // Use portfolio1 endpoint for creating as well
      const response = await fetch(`${API_BASE_URL}/portfolio1`, {
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

      const response = await fetch(
        `${API_BASE_URL}/portfolio1/me/my-portfolio`,
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

      // Use the data as-is since it's already in the correct API format
      const response = await fetch(`${API_BASE_URL}/portfolio1/${id}`, {
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

      const response = await fetch(`${API_BASE_URL}/portfolio1/${id}`, {
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

  createCustomLink: async (portfolioId, linkData) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Creating custom link for portfolio:", portfolioId);

      const response = await fetch(
        `${API_BASE_URL}/link/portfolio1/${portfolioId}/custom-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(linkData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create custom link");
      }

      const result = await response.json();
      console.log("Custom link created successfully:", result);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error creating custom link:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  createPasswordProtectedLink: async (portfolioId, linkData) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log(
        "Creating password protected link for portfolio:",
        portfolioId
      );

      const response = await fetch(
        `${API_BASE_URL}/link/portfolio1/${portfolioId}/custom-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...linkData, isPasswordProtected: true }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create password protected link"
        );
      }

      const result = await response.json();
      console.log("Password protected link created successfully:", result);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error creating password protected link:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  setPortfolio: (portfolio) => set({ portfolio }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default usePortfolioOneStore;
