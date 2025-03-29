/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from '../src/types/index';

// If you need to augment the User type locally
type UserWithDetails = User & { 
  details?: Record<string, any>
};

type AuthState = {
  user: UserWithDetails | null;
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
    user?: UserWithDetails;
    message?: string;
    error?: string;
    success?: boolean;
  }>;
  signOut: () => void;
  clearError: () => void;
  verification: (email: string) => Promise<any>;
  verifyCode: (code: string) => Promise<any>; // New function for verifying code
  resendVerificationCode: () => Promise<void>;
}

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
            const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || 'Failed to sign up');
            }

            // Store email in localStorage for verification
            localStorage.setItem('userEmail', data.email);

            set({
              isLoading: false,
              user: {
                id: result.userId,
                email: data.email,
                name: data.name,
                verified: false 
              }
            });

            return { 
              status: response.status,
              userId: result.userId 
            };
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'An error occurred',
              isLoading: false
            });
            throw error;
          }
        },

        signIn: async (credentials: { identifier: string; password: string }) => {
          set({ isLoading: true, error: null });
          try {
            console.log('Attempting to sign in with:', credentials.identifier);
            
            const response = await fetch("/api/auth/signin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            });
            
            // Log the raw response for debugging
            console.log('Sign-in response status:', response.status);
            
            const result = await response.json();
            
            if (!response.ok) {
              throw new Error(result.message || "Sign-in failed");
            }
            
            console.log('Sign-in successful:', result);
            
            // Store the email in localStorage for verification if needed
            localStorage.setItem('userEmail', result.user.email);
            // Also store the token in localStorage
            localStorage.setItem('token', result.token);
            
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
              message: result.message || 'Sign in successful'
            };
          } catch (error) {
            console.error('Sign-in error:', error);
            set({
              error: error instanceof Error ? error.message : "An error occurred",
              isLoading: false,
            });
            
            // Return error information for component-level handling
            return {
              status: 401,
              error: error instanceof Error ? error.message : "Sign-in failed",
              success: false
            };
          }
        },

        signOut: () => {
          // Remove email from localStorage when signing out
          localStorage.removeItem('userEmail');
          
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
              body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || "Verification failed");
            }

            return result;
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Failed to send verification email",
              isLoading: false
            });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },

        // NEW FUNCTION: Verify code entered by user
        verifyCode: async (code: string) => {
          set({ isLoading: true, error: null });
          try {
            // Get the user's email from state or localStorage
            const userEmail = get().user?.email || localStorage.getItem('userEmail');
            
            if (!userEmail) {
              throw new Error('No email found to verify');
            }
            
            console.log(`Verifying code ${code} for email ${userEmail}`);
            
            const response = await fetch("/api/auth/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                code,
                email: userEmail 
              })
            });

            // Handle non-JSON responses
            if (!response.ok) {
              if (response.status === 404) {
                console.error('API endpoint not found:', response.status, response.statusText);
                throw new Error("Verification API endpoint not found");
              }
              
              const errorData = await response.json().catch(() => ({ 
                error: `Server returned ${response.status} ${response.statusText}` 
              }));
              throw new Error(errorData.error || "Verification failed");
            }

            const result = await response.json();
            console.log('Verification successful:', result);

            // If verification successful, update user state
            if (result.verified) {
              const user = get().user;
              if (user) {
                set({
                  user: {
                    ...user,
                    verified: true
                  }
                });
              }
            }

            return result;
          } catch (error) {
            console.error('Verification error:', error);
            set({
              error: error instanceof Error ? error.message : "Failed to verify code",
              isLoading: false
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
            const userEmail = get().user?.email || localStorage.getItem('userEmail');
            
            if (!userEmail) {
              throw new Error('No email found to send verification code');
            }
            
            console.log(`Resending verification code to ${userEmail}`);
            
            const response = await fetch('/api/auth/resend-verification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userEmail }),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || 'Failed to resend verification code');
            }

            set({ isLoading: false });
            return result;
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to resend code',
              isLoading: false
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
