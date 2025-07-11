/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE_URL = "https://profilexbackend.onrender.com/api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
  lastLogin: number | null;
  signUp: (userData: SignUpData) => Promise<Response | undefined>;
  signIn: (credentials: SignInCredentials) => Promise<Response | undefined>;
  signOut: () => void;
  verifyCode: (verificationData: VerificationData) => Promise<Response | undefined>;
  resendVerificationCode: (email?: string) => Promise<Response | undefined>;
  resetPassword: (resetData: ResetPasswordData) => Promise<Response | undefined>;
  forgotPassword: (email: string) => Promise<Response | undefined>;
  checkAuthState: () => Promise<boolean>;
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
  email?: string;
  password: string;
  token?: string;
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
      refreshToken: null,
      lastLogin: null,

      signUp: async (userData: SignUpData) => {
        try {
          console.log("📝 SignUp attempt with:", userData.email);
          
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          console.log("📝 SignUp response status:", response.status);
          console.log("📝 SignUp response ok:", response.ok);
          
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
          console.log("🔍 Attempting email verification for:", verificationData.email);
          
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

          console.log("🔍 Verification response status:", response.status);
          console.log("🔍 Verification response ok:", response.ok);
          
          return response;
        } catch (error) {
          console.error("❌ Email verification error:", error);
          return undefined;
        }
      },

      resendVerificationCode: async (email?: string) => {
        try {
          const emailToUse = email || (isClient ? localStorage.getItem("userEmail") : null);

          if (!emailToUse) {
            throw new Error("Email address is missing");
          }

          console.log("🔄 Attempting to resend verification code for:", emailToUse);

          // Try common resend verification endpoint names
          const possibleEndpoints = [
            `${API_BASE_URL}/auth/resend-verification`,
            `${API_BASE_URL}/auth/resend-verification-email`,
            `${API_BASE_URL}/auth/resend-code`,
            `${API_BASE_URL}/auth/resend-email`,
            `${API_BASE_URL}/auth/send-verification`,
            `${API_BASE_URL}/auth/resend`,
          ];

          for (const endpoint of possibleEndpoints) {
            try {
              console.log("🔄 Trying resend endpoint:", endpoint);
              
              const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailToUse }),
              });

              console.log("🔄 Response status for", endpoint, ":", response.status);
              
              // If we get anything other than 404, this is probably the right endpoint
              if (response.status !== 404) {
                console.log("✅ Found working resend endpoint:", endpoint);
                return response;
              }
            } catch (endpointError) {
              console.log("❌ Error with resend endpoint", endpoint, ":", endpointError);
              continue;
            }
          }

          // If all endpoints fail, return a 404 response
          console.error("❌ All resend verification endpoints failed");
          return new Response(JSON.stringify({ 
            success: false, 
            message: "Resend verification endpoint not found" 
          }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });

        } catch (error) {
          console.error("❌ Error resending verification code:", error);
          return undefined;
        }
      },

      signIn: async (credentials: SignInCredentials) => {
        try {
          set({ isLoading: true });
          
          console.log("🔐 SignIn attempt with:", credentials.email);
          
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
      
          const data = await response.json();
          
          console.log("🔐 SignIn response status:", response.status);
          console.log("🔐 SignIn response ok:", response.ok);
          console.log("🔐 Full response data:", data);
          console.log("🔐 Response data keys:", Object.keys(data));
          
          // Check different possible data structures from your backend
          const userData = data.user || data.data?.user || data;
          const token = data.token || data.accessToken || data.data?.token || data.data?.accessToken;
          const refreshToken = data.refreshToken || data.data?.refreshToken;
          
          console.log("🔍 Parsed data:", {
            userData,
            token: token ? token.substring(0, 20) + "..." : "none",
            refreshToken: refreshToken ? "present" : "none"
          });
      
          if (response.ok && userData && token) {
            console.log("✅ SignIn successful - updating auth state");
            
            // Update auth state
            set({
              user: {
                id: userData.id || userData._id,
                name: userData.name || userData.username,
                email: userData.email,
              },
              isAuthenticated: true,
              token: token,
              refreshToken: refreshToken || null,
              lastLogin: Date.now(),
              isLoading: false,
            });
      
            console.log("✅ Auth state updated successfully");
            console.log("🔍 Current auth state:", {
              isAuthenticated: get().isAuthenticated,
              hasToken: !!get().token,
              hasUser: !!get().user,
              userName: get().user?.name
            });
            
            return new Response(JSON.stringify(data), {
              status: 200,
              statusText: "OK",
              headers: { "Content-Type": "application/json" },
            });
          }
      
          console.error("❌ SignIn failed - missing required data");
          console.error("❌ Message:", data.message || "Unknown error");
          console.error("❌ Has user data:", !!userData);
          console.error("❌ Has token:", !!token);
          
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            refreshToken: null,
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
            refreshToken: null,
            isLoading: false,
          });
          return undefined;
        }
      },

      checkAuthState: async () => {
        try {
          const { token } = get();

          console.log("🔍 Checking auth state:", {
            hasToken: !!token,
            tokenPreview: token ? token.substring(0, 20) + "..." : "none"
          });

          // If no token, user is definitely not authenticated
          if (!token) {
            console.log("❌ No token found - user not authenticated");
            set({
              isAuthenticated: false,
              user: null,
            });
            return false;
          }

          // Verify token with the backend using the /auth/check endpoint
          console.log("🔑 Token found, verifying with server...");
          
          try {
            const response = await fetch(`${API_BASE_URL}/auth/check`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });

            console.log("📡 Auth check response status:", response.status);
            
            if (response.ok) {
              const userData = await response.json();
              console.log("✅ Token is valid - user is authenticated");
              console.log("👤 User data from server:", userData);
              
              // Update user data and ensure isAuthenticated is true
              set({
                user: userData.user || userData,
                isAuthenticated: true,
              });
              
              return true;
            } else if (response.status === 401) {
              console.log("❌ Token is invalid/expired - clearing auth state");
              set({
                isAuthenticated: false,
                token: null,
                refreshToken: null,
                user: null,
              });
              return false;
            } else {
              console.log("❌ Auth check failed with status:", response.status);
              set({
                isAuthenticated: false,
                token: null,
                refreshToken: null,
                user: null,
              });
              return false;
            }
          } catch (networkError) {
            console.error("❌ Network error during auth check:", networkError);
            // Don't clear auth state on network errors, just return false
            return false;
          }
        } catch (error) {
          console.error("❌ Error checking auth state:", error);
          set({
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            user: null,
          });
          return false;
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
              userId: resetData.email
            }),
          });
          return response;
        } catch (error) {
          console.error("Password reset error:", error);
          return undefined;
        }
      },

      // Simplified sign out - just clear local state, no API call
      signOut: () => {
        try {
          console.log("🔓 Signing out user...");
          
          // Clear any stored email from localStorage
          if (isClient) {
            localStorage.removeItem("userEmail");
          }

          // Clear auth state
          set({
            user: null,
            isAuthenticated: false,
            token: null,
            refreshToken: null,
            lastLogin: null,
          });

          console.log("✅ User signed out successfully - all tokens cleared");
        } catch (error) {
          console.error("❌ Logout error:", error);
          // Force clear auth state even if there's an error
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
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
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

    const result = await response.json();
    return result.exists;
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
}
