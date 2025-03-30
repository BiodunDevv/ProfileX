/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
  user: { id: any; email: string; name: string; verified: boolean } | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ status: number; userId: string }>;
  signIn: (data: { identifier: string; password: string }) => Promise<{
    status: number;
    message?: string;
    error?: string;
    success?: boolean;
  }>;
  signOut: () => void;
  clearError: () => void;
  verification: (email: string) => Promise<any>;
  verifyCode: (code: string) => Promise<any>;
  resendVerificationCode: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,

        signUp: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch("/api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || "Failed to sign up");
            }

            // Store email in localStorage for verification
            localStorage.setItem("userEmail", data.email);

            set({
              isLoading: false,
              user: {
                id: result.userId,
                email: data.email,
                name: data.name,
                verified: false,
              },
            });

            return {
              status: response.status,
              userId: result.userId,
            };
          } catch (error) {
            set({
              error:
                error instanceof Error ? error.message : "An error occurred",
              isLoading: false,
            });
            throw error;
          }
        },

        signIn: async (credentials: {
          identifier: string;
          password: string;
        }) => {
          set({ isLoading: true, error: null });
          try {
            // Normalize credentials before sending
            const normalizedCredentials = {
              identifier: credentials.identifier.trim().toLowerCase(),
              password: credentials.password,
            };

            console.log(
              "Attempting to sign in with:",
              normalizedCredentials.identifier
            );

            const response = await fetch("/api/auth/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(normalizedCredentials),
              credentials: "include", // Include cookies in case they're needed
            });

            // Important: Get the result BEFORE checking response.ok
            const result = await response.json();
            console.log("Sign-in raw response:", result);

            // Log the raw response for debugging
            console.log("Sign-in response status:", response.status);

            if (!response.ok) {
              throw new Error(result.message || "Sign-in failed");
            }

            // Check for required fields in the response
            if (!result.user || !result.token) {
              console.error("Invalid response structure:", result);
              throw new Error("Server returned invalid data");
            }

            console.log("Sign-in successful:", result);

            // Store the email in localStorage for verification if needed
            localStorage.setItem("userEmail", result.user.email);
            // Also store the token in localStorage
            localStorage.setItem("token", result.token);

            // Update the auth state in the store
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false,
            });

            // Return useful information to the component
            return {
              status: response.status,
              user: result.user,
              message: result.message || "Sign in successful",
              success: true,
            };
          } catch (error) {
            console.error("Sign-in error:", error);
            set({
              error:
                error instanceof Error ? error.message : "An error occurred",
              isLoading: false,
              // Ensure auth state is reset on error
              isAuthenticated: false,
              user: null,
              token: null,
            });

            // Return error information for component-level handling
            return {
              status: 401,
              error: error instanceof Error ? error.message : "Sign-in failed",
              success: false,
            };
          }
        },

        signOut: () => {
          // Remove email from localStorage when signing out
          localStorage.removeItem("userEmail");

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        },

        verification: async (email: string) => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch("/api/auth/verification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || "Verification failed");
            }

            return result;
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to send verification email",
              isLoading: false,
            });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },

        verifyCode: async (code: string) => {
          set({ isLoading: true, error: null });
          try {
            // Get the user's email from state or localStorage
            const userEmail =
              get().user?.email || localStorage.getItem("userEmail");

            if (!userEmail) {
              throw new Error("No email found to verify");
            }

            console.log(`Verifying code ${code} for email ${userEmail}`);

            const response = await fetch("/api/auth/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                code,
                email: userEmail,
              }),
            });

            // Handle non-JSON responses
            if (!response.ok) {
              if (response.status === 404) {
                console.error(
                  "API endpoint not found:",
                  response.status,
                  response.statusText
                );
                throw new Error("Verification API endpoint not found");
              }

              const errorData = await response.json().catch(() => ({
                error: `Server returned ${response.status} ${response.statusText}`,
              }));
              throw new Error(errorData.error || "Verification failed");
            }

            const result = await response.json();
            console.log("Verification successful:", result);

            // If verification successful, update user state
            if (result.verified) {
              const user = get().user;
              if (user) {
                set({
                  user: {
                    ...user,
                    verified: true,
                  },
                });
              }
            }

            return result;
          } catch (error) {
            console.error("Verification error:", error);
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to verify code",
              isLoading: false,
            });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },

        resendVerificationCode: async () => {
          set({ isLoading: true, error: null });
          try {
            // Get user email from state or localStorage
            const userEmail =
              get().user?.email || localStorage.getItem("userEmail");

            if (!userEmail) {
              throw new Error("No email found to send verification code");
            }

            console.log(`Resending verification code to ${userEmail}`);

            const response = await fetch("/api/auth/resend-verification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: userEmail }),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(
                result.error || "Failed to resend verification code"
              );
            }

            set({ isLoading: false });
            return result;
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to resend code",
              isLoading: false,
            });
            throw error;
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

// Moved the function outside the store definition and made it async
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
