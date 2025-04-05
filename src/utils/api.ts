import { useAuthStore } from '../../store/useAuthStore';

export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  // Get the authentication token from the auth store
  const { token, refreshToken, refreshAccessToken, isAuthenticated } = useAuthStore.getState();
  
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
  
  // Make the request
  let response = await fetch(url, {
    ...options,
    headers
  });
  
  // If unauthorized and we have a refresh token, try to refresh
  if (response.status === 401 && refreshToken && refreshAccessToken) {
    try {
      console.log("Token expired, attempting to refresh...");
      const success = await refreshAccessToken();
      
      if (success) {
        // Get the new token after refresh
        const newToken = useAuthStore.getState().token;
        
        // Retry the request with the new token
        headers.set('Authorization', `Bearer ${newToken}`);
        response = await fetch(url, {
          ...options,
          headers
        });
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
    }
  }
  
  return response;
}