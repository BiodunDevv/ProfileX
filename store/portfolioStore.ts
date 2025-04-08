/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { fetchWithAuth } from "../src/utils/api";

// Define the Portfolio interface
interface Portfolio {
  _id: string;
  user: string;
  templateType: string;
  title: string;
  description?: string;
  customUrl?: string;
  isPublic: boolean;
  email?: string;
  phone?: string;
  contactSettings?: {
    enableContactForm: boolean;
    notifyViaEmail: boolean;
    showEmailPublicly: boolean;
    showPhonePublicly: boolean;
    emailSubjectPrefix: string;
  };
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

// Define the store state
interface PortfolioStore {
  // Portfolio data
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUserPortfolios: () => Promise<void>;
  fetchPortfolioById: (id: string) => Promise<Portfolio | null>;
  fetchPortfolioByCustomUrl: (customUrl: string) => Promise<Portfolio | null>;
  createPortfolio: (data: Partial<Portfolio>) => Promise<Portfolio | null>;
  updatePortfolio: (
    id: string,
    data: Partial<Portfolio>
  ) => Promise<Portfolio | null>;
  deletePortfolio: (id: string) => Promise<boolean>;
  generateCustomUrl: (
    portfolioId: string,
    customUrl: string
  ) => Promise<{ customUrl: string; fullUrl: string } | null>;
  checkCustomUrlAvailability: (customUrl: string) => Promise<boolean>;
  sendContactMessage: (data: ContactFormData) => Promise<boolean>;
  resetState: () => void;
}

// Contact form data interface
interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  portfolioId?: string;
  portfolioCustomUrl?: string;
  recipientEmail?: string;
}

// Create the store
const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  // Initial state
  portfolios: [],
  currentPortfolio: null,
  isLoading: false,
  error: null,

  fetchUserPortfolios: async () => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to fetch portfolios");
      }

      const response = await fetch("/api/portfolios/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch portfolios");
      }

      const data = await response.json();
      set({ portfolios: data.portfolios, isLoading: false });
      return data.portfolios;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error("Failed to load portfolios");
    }
  },

  fetchPortfolioById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to fetch portfolio");
      }

      const response = await fetch(`/api/portfolios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch portfolio");
      }

      const data = await response.json();
      set({ currentPortfolio: data.portfolio, isLoading: false });
      return data.portfolio;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error("Failed to load portfolio");
      return null;
    }
  },

  fetchPortfolioByCustomUrl: async (customUrl: string) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to fetch portfolio");
      }

      const response = await fetch(`/api/portfolios/url/${customUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch portfolio");
      }

      const data = await response.json();
      set({ currentPortfolio: data.portfolio, isLoading: false });
      return data.portfolio;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      return null;
    }
  },

  createPortfolio: async (data: Partial<Portfolio>) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetchWithAuth("/api/portfolios/portfolioone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create portfolio");
      }

      const responseData = await response.json();

      // Update the portfolios list with the new portfolio
      set((state) => ({
        portfolios: [...state.portfolios, responseData.portfolio],
        currentPortfolio: responseData.portfolio,
        isLoading: false,
      }));

      toast.success("Portfolio created successfully!");
      return responseData.portfolio;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to create portfolio"
      );
      return null;
    }
  },

  updatePortfolio: async (id: string, data: Partial<Portfolio>) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to update portfolio");
      }

      const response = await fetch(`/api/portfolios/portfolioone/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update portfolio");
      }

      const responseData = await response.json();

      set((state) => ({
        portfolios: state.portfolios.map((p) =>
          p._id === id ? responseData.portfolio : p
        ),
        currentPortfolio: responseData.portfolio,
        isLoading: false,
      }));

      toast.success("Portfolio updated successfully!");
      return responseData.portfolio;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to update portfolio"
      );
      return null;
    }
  },

  // Delete a portfolio
  deletePortfolio: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to delete portfolio");
      }

      const response = await fetch(`/api/portfolios/portfolioone/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete portfolio");
      }

      // Remove the portfolio from the list
      set((state) => ({
        portfolios: state.portfolios.filter((p) => p._id !== id),
        currentPortfolio:
          state.currentPortfolio?._id === id ? null : state.currentPortfolio,
        isLoading: false,
      }));

      toast.success("Portfolio deleted successfully!");
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to delete portfolio"
      );
      return false;
    }
  },

  // Generate or update a custom URL for a portfolio
  generateCustomUrl: async (portfolioId: string, customUrl: string) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to generate custom URL");
      }

      const response = await fetch("/api/portfolios/custom-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ portfolioId, customUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate custom URL");
      }

      const responseData = await response.json();

      // Update the portfolio in the list with the new custom URL
      set((state) => ({
        portfolios: state.portfolios.map((p) =>
          p._id === portfolioId
            ? { ...p, customUrl: responseData.customUrl, isPublic: true }
            : p
        ),
        currentPortfolio:
          state.currentPortfolio?._id === portfolioId
            ? {
                ...state.currentPortfolio,
                customUrl: responseData.customUrl,
                isPublic: true,
              }
            : state.currentPortfolio,
        isLoading: false,
      }));

      toast.success("Custom URL generated successfully!");
      return {
        customUrl: responseData.customUrl,
        fullUrl: responseData.fullUrl,
      };
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to generate custom URL"
      );
      return null;
    }
  },

  // Check if a custom URL is available
  checkCustomUrlAvailability: async (customUrl: string) => {
    try {
      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error(
          "You must be logged in to check custom URL availability"
        );
      }

      const response = await fetch(
        `/api/portfolios/custom-url?url=${encodeURIComponent(customUrl)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to check custom URL availability"
        );
      }

      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error("Error checking URL availability:", error);
      return false;
    }
  },

  // Send a contact message
  sendContactMessage: async (data: ContactFormData) => {
    try {
      set({ isLoading: true, error: null });

      const authStore = useAuthStore.getState();
      const token = authStore.token;

      if (!token) {
        throw new Error("You must be logged in to send message");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      set({ isLoading: false });
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
      return false;
    }
  },

  // Reset the store state
  resetState: () => {
    set({
      currentPortfolio: null,
      error: null,
      isLoading: false,
    });
  },
}));

export default usePortfolioStore;
