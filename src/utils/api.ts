import { useAuthStore } from '../../store/useAuthStore';

export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  // Get the authentication token from the auth store
  const { token, isAuthenticated } = useAuthStore.getState();
  
  console.log("fetchWithAuth - Auth state:", { 
    isAuthenticated, 
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : null
  });
  
  if (!isAuthenticated || !token) {
    throw new Error("Authentication required");
  }
  
  // Create headers with authentication
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  
  // Log request details
  console.log(`Making ${options.method || 'GET'} request to: ${url}`);
  console.log(`Auth header set: Bearer ${token.substring(0, 10)}...`);
  
  return fetch(url, {
    ...options,
    headers
  });
}