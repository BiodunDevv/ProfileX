import { useAuthStore } from '../../store/useAuthStore';

// Helper function for making authenticated API requests
export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  // Get the authentication token from the auth store
  const { token, isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated || !token) {
    throw new Error("Authentication required");
  }
  
  // Create headers with authentication
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  
  // Return fetch with auth headers
  return fetch(url, {
    ...options,
    headers
  });
}