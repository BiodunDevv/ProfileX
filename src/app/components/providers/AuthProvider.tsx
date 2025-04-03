"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authChecked, setAuthChecked] = useState(false);
  const { isAuthenticated, checkAuthState } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthState();
      setAuthChecked(true);
    };

    checkAuth();
  }, [checkAuthState]);

  useEffect(() => {
    if (!authChecked) return;

    // Public routes that don't require authentication
    const publicRoutes = [
      "/",
      "/signin",
      "/signup",
      "/forgotpassword",
      "/verification",
    ];
    const isPublicRoute = publicRoutes.some((route) =>
      pathname?.startsWith(route)
    );

    // Protected routes require authentication
    const needsAuth = !isPublicRoute;

    if (needsAuth && !isAuthenticated) {
      // Redirect to login if trying to access protected route while not authenticated
      console.log("Auth required, redirecting to signin");
      router.push("/signin");
    } else if (pathname === "/signin" && isAuthenticated) {
      // Redirect to dashboard if going to login page while already authenticated
      console.log("Already authenticated, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, pathname, router, authChecked]);

  return <>{children}</>;
}
