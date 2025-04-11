import { useAuthStore } from '../../store/useAuthStore';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const authStore = useAuthStore.getState();
  const { token } = authStore;

  if (!token) {
    throw new Error('No authentication token available');
  }

  console.log("Sending request with auth token:", token.substring(0, 15) + "...");

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers
  });
}