/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface PortfolioData {
  _id?: string;
  id?: string;
  slug?: string;
  templateType?: string;
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    tagline?: string;
  };
  title?: string;
  brandName?: string;
  heroImage?: string;
  description?: string;
  companies?: string[];
  sectionAbout?: string;
  sectionSubtitle?: string;
  aboutMeDescription?: string;
  skills?: Array<{
    name: string;
    level: number;
    color: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    years?: string;
    year?: string;
    description: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string[];
    imageUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  }>;
  contactInfo?: Array<{
    emailAddress: string;
    phoneNumber: string;
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  theme?: string;
  isPublic?: boolean;
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
  getPortfolioById: (id: string) => Promise<PortfolioData | null>;
  getPortfolioBySlug: (slug: string) => Promise<PortfolioData | null>;
  getPortfolioInfo: (id: string, portfolioType?: string) => Promise<any>;
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
  getLinkAnalytics: (portfolioId: string) => Promise<any>;
  getPortfolioByCustomLink: (slug: string) => Promise<any>;
  getPortfolioByProtectedLink: (
    slug: string,
    password?: string
  ) => Promise<any>;
  publishPortfolio: (portfolioId: string) => Promise<any>;
  
  // Slug management methods
  manageSlug: (portfolioId: string, action: 'create' | 'update' | 'remove', data?: { preferredName?: string; customSlug?: string }) => Promise<any>;
  getSlugSuggestions: (portfolioId: string, base: string) => Promise<any>;
  getCustomSlugInfo: (portfolioId: string) => Promise<any>;
  createCustomSlug: (portfolioId: string, customSlug: string) => Promise<any>;
  updateCustomSlug: (portfolioId: string, customSlug: string) => Promise<any>;
  removeCustomSlug: (portfolioId: string) => Promise<any>;
  getSlugSuggestionsList: (portfolioId: string, base: string) => Promise<any>;
  
  setPortfolio: (portfolio: PortfolioData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Export the interface for use in components
export type { PortfolioData };

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

      if (result.success && result.data?.portfolio) {
        set({ portfolio: result.data.portfolio, isLoading: false });
        return result.data.portfolio;
      }

      throw new Error("Invalid response format");
    } catch (error: any) {
      console.error("Error creating portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  manageSlug: async (portfolioId: string, action: 'create' | 'update' | 'remove', data?: { preferredName?: string; customSlug?: string }) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token;
      if (!token) throw new Error("Authentication required");

      const body: any = { action };
      if (data?.preferredName) body.preferredName = data.preferredName;
      if (data?.customSlug) body.customSlug = data.customSlug;

      console.log("Managing slug:", { portfolioId, action, data });

      const response = await fetch(`${API_BASE_URL}/portfolio1/${portfolioId}/manage-slug`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to manage slug");
      }

      const result = await response.json();
      console.log("Slug management result:", result);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error managing slug:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  getSlugSuggestions: async (portfolioId: string, base: string) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token;
      if (!token) throw new Error("Authentication required");

      console.log("Getting slug suggestions:", { portfolioId, base });

      const response = await fetch(
        `${API_BASE_URL}/portfolio1/${portfolioId}/slug-suggestions?base=${encodeURIComponent(base)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get suggestions");
      }

      const result = await response.json();
      console.log("Slug suggestions:", result);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error getting slug suggestions:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  getCustomSlugInfo: async (portfolioId: string) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token;
      if (!token) throw new Error("Authentication required");

      console.log("Getting custom slug info:", portfolioId);

      const response = await fetch(`${API_BASE_URL}/portfolio1/${portfolioId}/custom-slug-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get slug info");
      }

      const result = await response.json();
      console.log("Custom slug info:", result);

      set({ isLoading: false });
      return result;
    } catch (error: any) {
      console.error("Error getting custom slug info:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  getPortfolioBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });

    try {
      console.log("Fetching portfolio by slug:", slug);
      console.log("Using API URL:", API_BASE_URL);

      const response = await fetch(`${API_BASE_URL}/portfolio1/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // No authentication required for public viewing
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Portfolio not found");
      }

      const result = await response.json();
      console.log("Portfolio fetched by slug:", result);

      if (result.success && result.data?.portfolio) {
        set({ portfolio: result.data.portfolio, isLoading: false });
        return result.data.portfolio;
      }

      throw new Error("Portfolio not found");
    } catch (error: any) {
      console.error("Error fetching portfolio by slug:", error);
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

      console.log("Fetching my portfolio");
      console.log("Using API URL:", API_BASE_URL);

      const response = await fetch(`${API_BASE_URL}/portfolio1/my-portfolio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No portfolio found, return null instead of throwing error
          set({ isLoading: false });
          return null;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch portfolio");
      }

      const result = await response.json();
      console.log("My portfolio fetched:", result);

      let portfolio = null;
      if (result.success && result.data?.portfolio) {
        portfolio = result.data.portfolio;
      } else if (result.data) {
        portfolio = result.data;
      } else if (result._id || result.id) {
        portfolio = result;
      }

      set({ portfolio, isLoading: false });
      return portfolio;
    } catch (error: any) {
      console.error("Error getting my portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  updatePortfolio: async (id: string, data: Partial<PortfolioData>) => {
    set({ isLoading: true, error: null });

    try {
      const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
        ?.state?.token;

      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Updating portfolio:", id, data);
      console.log("Using API URL:", API_BASE_URL);

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
      console.log("Portfolio updated:", result);

      let portfolio = null;
      if (result.success && result.data?.portfolio) {
        portfolio = result.data.portfolio;
      } else if (result.data) {
        portfolio = result.data;
      } else if (result._id || result.id) {
        portfolio = result;
      }

      set({ portfolio, isLoading: false });
      return portfolio;
    } catch (error: any) {
      console.error("Error updating portfolio:", error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  // Placeholder implementations for other methods
  getPortfolioById: async (id: string) => {
    // Implementation here
    return null;
  },

  getPortfolioInfo: async (id: string, portfolioType?: string) => {
    // Implementation here
    return null;
  },

  deletePortfolio: async (id: string) => {
    // Implementation here
    return false;
  },

  createCustomLink: async (portfolioId: string, linkData: any) => {
    // Implementation here
    return null;
  },

  createPasswordProtectedLink: async (portfolioId: string, linkData: any) => {
    // Implementation here
    return null;
  },

  getLinkAnalytics: async (portfolioId: string) => {
    // Implementation here
    return null;
  },

  getPortfolioByCustomLink: async (slug: string) => {
    return get().getPortfolioBySlug(slug);
  },

  getPortfolioByProtectedLink: async (slug: string, password?: string) => {
    // Implementation here
    return null;
  },

  publishPortfolio: async (portfolioId: string) => {
    // Implementation here
    return null;
  },

  createCustomSlug: async (portfolioId: string, customSlug: string) => {
    return get().manageSlug(portfolioId, 'create', { customSlug });
  },

  updateCustomSlug: async (portfolioId: string, customSlug: string) => {
    return get().manageSlug(portfolioId, 'update', { customSlug });
  },

  removeCustomSlug: async (portfolioId: string) => {
    return get().manageSlug(portfolioId, 'remove');
  },

  getSlugSuggestionsList: async (portfolioId: string, base: string) => {
    return get().getSlugSuggestions(portfolioId, base);
  },

  setPortfolio: (portfolio: PortfolioData | null) => set({ portfolio }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default usePortfolioOneStore;
