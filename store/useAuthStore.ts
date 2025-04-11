/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
  lastLogin: number | null; // Track when user last logged in
  signUp: (userData: SignUpData) => Promise<Response | undefined>;
  signIn: (credentials: SignInCredentials) => Promise<Response | undefined>;
  signOut: () => Promise<void>;
  verifyCode: (
    verificationData: VerificationData
  ) => Promise<Response | undefined>;
  resendVerificationCode: (email?: string) => Promise<Response | undefined>;
  resetPassword: (
    resetData: ResetPasswordData
  ) => Promise<Response | undefined>;
  checkAuthState: () => Promise<boolean>; // New method to verify auth state
  refreshAccessToken: () => Promise<boolean>; // New method to refresh access token
}

interface User {
  id: string;
  name: string;
  email: string;
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
  email: string;
  password: string;
  token?: string;
}

// Check if we're running in a browser environment
const isClient = typeof window !== "undefined";

// Create a safe storage implementation that checks for browser environment
const createSafeStorage = () => {
  if (!isClient) {
    // Server-side storage mock
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }

  // Browser-side storage implementation
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
      refreshToken: null,
      lastLogin: null,

      signUp: async (userData: SignUpData) => {
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          return response;
        } catch (error) {
          console.error("Signup error:", error);
          return undefined;
        }
      },

      verifyCode: async (verificationData: VerificationData) => {
        try {
          console.log("Verifying code:", verificationData);

          const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: verificationData.email,
              verificationCode: verificationData.verificationCode,
            }),
          });

          const data = await response.json();
          console.log("Verification response:", data);

          if (response.ok) {
            // Optionally update auth state here if you want to log the user in after verification
            // set({ isAuthenticated: true, user: { ... } });
          }

          return response;
        } catch (error) {
          console.error("Verification error:", error);
          return undefined;
        }
      },

      resendVerificationCode: async (email?: string) => {
        try {
          // Get the email from the provided parameter or from localStorage (safely)
          const emailToUse =
            email || (isClient ? localStorage.getItem("userEmail") : null);

          if (!emailToUse) {
            throw new Error("Email address is missing");
          }

          const response = await fetch("/api/auth/resend-verification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailToUse }),
          });

          return response;
        } catch (error) {
          console.error("Error resending verification code:", error);
          return undefined;
        }
      },

      signIn: async (credentials: SignInCredentials) => {
        try {
          set({ isLoading: true });
          
          console.log("SignIn attempt with:", credentials.email);
      
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
      
          const data = await response.json();
          
          console.log("SignIn response data:", {
            status: response.status,
            ok: response.ok,
            hasUser: !!data.user,
            hasToken: !!data.token
          });
      
          if (response.ok) {
            // Debug user data
            console.log("User data received:", {
              id: data.user?.id,
              name: data.user?.name,
              email: data.user?.email
            });
            
            // Debug the token details
            if (data.token) {
              try {
                const parts = data.token.split('.');
                if (parts.length === 3) {
                  const payload = JSON.parse(atob(parts[1]));
                  console.log("Token payload:", payload);
                  console.log("User ID in token vs user object:", {
                    tokenUserId: payload.userId,
                    userObjectId: data.user?.id,
                    match: payload.userId === data.user?.id
                  });
                }
              } catch (e) {
                console.error("Failed to parse token:", e);
              }
            }
      
            // Store tokens from response with timestamp
            set({
              user: data.user,
              isAuthenticated: true,
              token: data.token,
              refreshToken: data.refreshToken,
              lastLogin: Date.now(),
            });
      
            console.log("Auth state updated with new token");
            
            return new Response(JSON.stringify(data), {
              status: response.status,
              headers: { "Content-Type": "application/json" },
            });
          }
      
          console.error("SignIn failed:", data.message || "Unknown error");
          return response;
        } catch (error) {
          console.error("Login error:", error);
          return undefined;
        } finally {
          set({ isLoading: false });
        }
      },

      // New method to check and refresh auth state
      checkAuthState: async () => {
        try {
          const { token, refreshToken, lastLogin, isAuthenticated } = get();

          // If user is not authenticated or no token exists, return false
          if (!isAuthenticated || !token) {
            return false;
          }


          console.log("Auth state checked - User is authenticated");
          return true;
        } catch (error) {
          console.error("Error checking auth state:", error);
          // If there's an error, reset auth state
          set({
            isAuthenticated: false,
            token: null,
            refreshToken: null,
          });
          return false;
        }
      },

      // Add this to your auth store implementation
      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          
          if (!refreshToken) {
            console.error("No refresh token available");
            return false;
          }
          
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });
          
          if (!response.ok) {
            console.error("Failed to refresh token:", response.status);
            // If refresh fails, sign the user out
            get().signOut();
            return false;
          }
          
          const data = await response.json();
          
          if (data.token) {
            // Update the token in the store
            set({
              token: data.token,
              // Optionally update the refresh token if your API provides a new one
              refreshToken: data.refreshToken || get().refreshToken,
            });
            console.log("Access token refreshed successfully");
            return true;
          }
          
          return false;
        } catch (error) {
          console.error("Error refreshing token:", error);
          // On any error, sign the user out for security
          get().signOut();
          return false;
        }
      },

      resetPassword: async (resetData: ResetPasswordData) => {
        try {
          const { email, password, token } = resetData;
          const tokenToUse = token || get().token;

          const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              token: tokenToUse,
            }),
          });

          return response;
        } catch (error) {
          console.error("Password reset error:", error);
          return undefined;
        }
      },

      signOut: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
          });

          // Always clear the auth state, even if the API call fails
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            lastLogin: null,
          });

          console.log("User signed out successfully");
        } catch (error) {
          console.error("Logout error:", error);

          // Still clear auth state even if API fails
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            lastLogin: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      // Persist more data for authentication
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        lastLogin: state.lastLogin,
        // Still don't store refresh token in localStorage for security
      }),
      storage: createSafeStorage(),
    }
  )
);

export async function checkIfUserExists(identifier: string) {
  try {
    const response = await fetch("/api/auth/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: identifier.toLowerCase() }),
    });

    const result = await response.json();
    console.log("User exists check:", result);
    return result.exists;
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
}
