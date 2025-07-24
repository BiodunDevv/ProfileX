/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  lastLogin: number | null;
  signUp: (userData: SignUpData) => Promise<Response | undefined>;
  signIn: (credentials: SignInCredentials) => Promise<Response | undefined>;
  signOut: () => void;
  verifyCode: (
    verificationData: VerificationData
  ) => Promise<Response | undefined>;
  resendVerificationCode: (email?: string) => Promise<Response | undefined>;
  resetPassword: (
    resetData: ResetPasswordData
  ) => Promise<Response | undefined>;
  forgotPassword: (email: string) => Promise<Response | undefined>;
  checkAuthState: () => Promise<boolean>;
  getUserProfile: () => Promise<Response | undefined>;
  getAllUserPortfolios: () => Promise<PortfolioResponse | undefined>;
  getPortfolioStats: () => Promise<PortfolioStatsResponse | undefined>;
}

interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface VerificationData {
  email: string;
  verificationCode: string;
}

interface ResetPasswordData {
  email?: string;
  password: string;
  token?: string;
}

interface Portfolio {
  id: string;
  type: string;
  templateType: string;
  title: string;
  brandName?: string;
  name?: string;
  devName?: string;
  slug: string;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  apiEndpoint: string;
  editEndpoint: string;
  publicUrl: string;
}

interface PortfolioStats {
  totalPortfolios: number;
  totalViews: number;
  publicPortfolios: number;
  privatePortfolios: number;
  mostRecentUpdate: string;
  oldestPortfolio: string;
  portfolio1Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
  portfolio2Stats?: {
    views: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface PortfolioResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  data: {
    totalPortfolios: number;
    hasPortfolio1: boolean;
    hasPortfolio2: boolean;
    portfolios: Portfolio[];
  };
}

interface PortfolioStatsResponse {
  success: boolean;
  message: string;
  data: PortfolioStats;
}

const isClient = typeof window !== "undefined";

const createSafeStorage = () => {
  if (!isClient) {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }

  return {
    getItem: (name: string) => {
      try {
        const value = localStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      } catch (e) {
        console.error("Error getting stored item:", e);
        return null;
      }
    },
    setItem: (name: string, value: any) => {
      try {
        localStorage.setItem(name, JSON.stringify(value));
      } catch (e) {
        console.error("Error storing item:", e);
      }
    },
    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch (e) {
        console.error("Error removing stored item:", e);
      }
    },
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      lastLogin: null,

      signUp: async (userData: SignUpData) => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          // Store email for verification process
          if (response.ok && isClient) {
            localStorage.setItem("userEmail", userData.email);
          }

          return response;
        } catch (error) {
          console.error("❌ Signup error:", error);
          return undefined;
        }
      },

      verifyCode: async (verificationData: VerificationData) => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: verificationData.email,
              verificationCode: verificationData.verificationCode,
            }),
          });

          return response;
        } catch (error) {
          console.error("❌ Email verification error:", error);
          return undefined;
        }
      },

      resendVerificationCode: async (email?: string) => {
        try {
          const emailToUse =
            email || (isClient ? localStorage.getItem("userEmail") : null);

          if (!emailToUse) {
            throw new Error("Email address is missing");
          }

          const response = await fetch(
            `${API_BASE_URL}/auth/resend-verification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: emailToUse }),
            }
          );

          return response;
        } catch (error) {
          console.error("❌ Error resending verification code:", error);
          return undefined;
        }
      },

      signIn: async (credentials: SignInCredentials) => {
        try {
          set({ isLoading: true });

          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();

          // Handle successful login based on backend response structure
          if (response.ok && data.success && data.data) {
            const { user: userData, token } = data.data;
            console.log("Token:", token);

            set({
              user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                isEmailVerified: userData.isEmailVerified,
              },
              isAuthenticated: true,
              token: token,
              lastLogin: Date.now(),
              isLoading: false,
            });

            return new Response(JSON.stringify(data), {
              status: 200,
              statusText: "OK",
              headers: { "Content-Type": "application/json" },
            });
          }

          // Check if this is a verification error
          if (
            !response.ok &&
            (data.needsVerification ||
              data.message?.toLowerCase().includes("verify"))
          ) {
            // Store email for verification process if available
            if (data.email && isClient) {
              localStorage.setItem("userEmail", data.email);
            }

            set({
              user: null,
              isAuthenticated: false,
              token: null,
              isLoading: false,
            });

            return new Response(
              JSON.stringify({
                ...data,
                needsVerification: true,
                email: data.email || credentials.email,
              }),
              {
                status: response.status,
                statusText: response.statusText,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          set({
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
          });

          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("❌ SignIn network error:", error);
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
          });
          return undefined;
        }
      },

      checkAuthState: async () => {
        try {
          const { token } = get();

          // If no token, user is definitely not authenticated
          if (!token) {
            set({
              isAuthenticated: false,
              user: null,
            });
            return false;
          }

          try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const result = await response.json();
              const userData = result.data?.user || result.user || result;

              // Update user data with complete profile information
              set({
                user: {
                  id: userData.id || userData._id,
                  name: userData.name,
                  email: userData.email,
                  isEmailVerified: userData.isEmailVerified,
                },
                isAuthenticated: true,
              });

              return true;
            } else if (response.status === 401) {
              set({
                isAuthenticated: false,
                token: null,
                user: null,
              });
              return false;
            } else {
              set({
                isAuthenticated: false,
                token: null,
                user: null,
              });
              return false;
            }
          } catch (networkError) {
            console.error("❌ Network error during auth check:", networkError);
            return false;
          }
        } catch (error) {
          console.error("❌ Error checking auth state:", error);
          set({
            isAuthenticated: false,
            token: null,
            user: null,
          });
          return false;
        }
      },

      getUserProfile: async () => {
        try {
          const { token } = get();

          if (!token) {
            return undefined;
          }

          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            const userData = result.data?.user || result.user || result;

            // Update user data in store
            set({
              user: {
                id: userData.id || userData._id,
                name: userData.name,
                email: userData.email,
                isEmailVerified: userData.isEmailVerified,
              },
            });
          }

          return response;
        } catch (error) {
          console.error("❌ Error fetching user profile:", error);
          return undefined;
        }
      },

      forgotPassword: async (email: string) => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          return response;
        } catch (error) {
          console.error("Forgot password error:", error);
          return undefined;
        }
      },

      resetPassword: async (resetData: ResetPasswordData) => {
        try {
          const { password, token } = resetData;

          if (!token) {
            throw new Error("Reset token is required");
          }

          const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              token,
              userId: resetData.email,
            }),
          });
          return response;
        } catch (error) {
          console.error("Password reset error:", error);
          return undefined;
        }
      },

      getAllUserPortfolios: async () => {
        try {
          const { token } = get();

          if (!token) {
            return undefined;
          }

          const response = await fetch(`${API_BASE_URL}/user/portfolios`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            return result as PortfolioResponse;
          }

          return undefined;
        } catch (error) {
          console.error("❌ Error fetching user portfolios:", error);
          return undefined;
        }
      },

      getPortfolioStats: async () => {
        try {
          const { token } = get();

          if (!token) {
            return undefined;
          }

          const response = await fetch(
            `${API_BASE_URL}/user/portfolios/stats`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const result = await response.json();
            return result as PortfolioStatsResponse;
          }

          return undefined;
        } catch (error) {
          console.error("❌ Error fetching portfolio stats:", error);
          return undefined;
        }
      },

      // Simplified sign out - just clear local state, no API call
      signOut: () => {
        try {
          // Clear any stored email from localStorage
          if (isClient) {
            localStorage.removeItem("userEmail");
          }

          // Clear auth state
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            lastLogin: null,
          });
        } catch (error) {
          console.error("❌ Logout error:", error);
          // Force clear auth state even if there's an error
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            lastLogin: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        lastLogin: state.lastLogin,
      }),
      storage: createSafeStorage(),
    }
  )
);

export async function checkIfUserExists(identifier: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: identifier.toLowerCase() }),
    });

    if (!response.ok) {
      console.error("❌ Check user failed with status:", response.status);
      return false;
    }

    const result = await response.json();

    return result.exists || result.success;
  } catch (error) {
    console.error("❌ Error checking user:", error);
    return false;
  }
}

export type {
  Portfolio,
  PortfolioStats,
  PortfolioResponse,
  PortfolioStatsResponse,
};
