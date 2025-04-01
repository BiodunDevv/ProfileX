/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (userData: SignUpData) => Promise<Response | undefined>;
  signIn: (credentials: SignInCredentials) => Promise<Response | undefined>;
  signOut: () => Promise<void>;
  verifyCode: (verificationData: VerificationData) => Promise<Response | undefined>;
  resendVerificationCode: (email?: string) => Promise<Response | undefined>;
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  signUp: async (userData: SignUpData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Don't set authenticated here since we'll wait for email verification
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      return undefined;
    }
  },
  
  verifyCode: async (verificationData: VerificationData) => {
    try {
      console.log('Verifying code:', verificationData);
      
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: verificationData.email,
          verificationCode: verificationData.verificationCode
        }),
      });

      const data = await response.json();
      console.log('Verification response:', data);
      
      if (response.ok) {
        // Optionally update auth state here if you want to log the user in after verification
        // set({ isAuthenticated: true, user: { ... } });
      }
      
      return response;
    } catch (error) {
      console.error('Verification error:', error);
      return undefined;
    }
  },

  resendVerificationCode: async (email?: string) => {
    try {
      // Get the email from the provided parameter or from localStorage
      const emailToUse = email || localStorage.getItem("userEmail");
      
      if (!emailToUse) {
        throw new Error("Email address is missing");
      }
      
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToUse }),
      });
      
      return response;
    } catch (error) {
      console.error('Error resending verification code:', error);
      return undefined;
    }
  },

  signIn: async (credentials: SignInCredentials) => {
    try {
      set({ isLoading: true });
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        set({ 
          user: data.user,
          isAuthenticated: true,
        });
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        set({ 
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));

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
