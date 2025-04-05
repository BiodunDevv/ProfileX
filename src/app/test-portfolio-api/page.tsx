'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { fetchWithAuth } from '../../utils/api';

export default function TestPortfolioAPI() {
  const { isAuthenticated, user, token, signIn } = useAuthStore();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Portfolio form state
  const [portfolioData, setPortfolioData] = useState({
    title: '',
    description: '',
    templateType: 'template1'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Test GET - Fetch portfolio
  const testGetPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchWithAuth('/api/portfolios/portfolioone');
      const data = await response.json();
      
      setApiResponse(data);
      console.log('GET Response:', data);
    } catch (err) {
      console.error('GET Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Test POST - Create portfolio
  const testCreatePortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timestamp to make title unique
      const postData = {
        ...portfolioData,
        title: portfolioData.title || `Test Portfolio ${new Date().toISOString().substring(0, 19)}`,
      };
      
      const response = await fetchWithAuth('/api/portfolios/portfolioone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const data = await response.json();
      setApiResponse(data);
      console.log('POST Response:', data);
    } catch (err) {
      console.error('POST Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Test PATCH - Update portfolio
  const testUpdatePortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create update data
      const updateData = {
        ...portfolioData,
        title: portfolioData.title || `Updated Title ${new Date().toISOString().substring(0, 19)}`,
      };
      
      const response = await fetchWithAuth('/api/portfolios/portfolioone', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      setApiResponse(data);
      console.log('PATCH Response:', data);
    } catch (err) {
      console.error('PATCH Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Test DELETE - Delete portfolio
  const testDeletePortfolio = async () => {
    if (!confirm('Are you sure you want to delete the portfolio? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchWithAuth('/api/portfolios/portfolioone', {
        method: 'DELETE',
      });
      
      const data = await response.json();
      setApiResponse(data);
      console.log('DELETE Response:', data);
    } catch (err) {
      console.error('DELETE Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await signIn({ email, password });
      
      if (!response || !response.ok) {
        const errorText = response ? await response.text() : 'Login failed';
        throw new Error(errorText);
      }
      
      setApiResponse({ message: 'Login successful' });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Portfolio API Testing</h1>
      
      {/* Authentication Status */}
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
        <div className="grid grid-cols-1 gap-2">
          <div><strong>Authenticated:</strong> {isAuthenticated ? 'Yes ✅' : 'No ❌'}</div>
          <div><strong>User:</strong> {user ? `${user.name} (${user.email})` : 'Not logged in'}</div>
          <div><strong>Token:</strong> {token ? `${token.substring(0, 15)}...` : 'No token'}</div>
        </div>
      </div>
      
      {/* Login Form */}
      {!isAuthenticated && (
        <div className="mb-8 p-4 border rounded bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      )}
      
      {/* API Test Section */}
      {isAuthenticated && (
        <>
          {/* Portfolio Data Form */}
          <div className="mb-8 p-4 border rounded bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Portfolio Data</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Title:</label>
                <input 
                  type="text" 
                  name="title"
                  value={portfolioData.title} 
                  onChange={handleInputChange}
                  placeholder="My Portfolio"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <textarea 
                  name="description"
                  value={portfolioData.description} 
                  onChange={handleInputChange}
                  placeholder="Portfolio description..."
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div>
                <label className="block mb-1">Template Type:</label>
                <select 
                  name="templateType"
                  value={portfolioData.templateType} 
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                  <option value="template3">Template 3</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* API Test Buttons */}
          <div className="mb-8 p-4 border rounded bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">API Operations</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={testGetPortfolio}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                disabled={loading}
              >
                GET - Fetch Portfolio
              </button>
              
              <button
                onClick={testCreatePortfolio}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                POST - Create Portfolio
              </button>
              
              <button
                onClick={testUpdatePortfolio}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                disabled={loading}
              >
                PATCH - Update Portfolio
              </button>
              
              <button
                onClick={testDeletePortfolio}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                disabled={loading}
              >
                DELETE - Remove Portfolio
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Response Display */}
      {(apiResponse || error) && (
        <div className="p-4 border rounded bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">API Response</h2>
          
          {loading && <div className="text-blue-500 mb-2">Loading...</div>}
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-800 rounded border border-red-200">
              <h3 className="font-bold">Error:</h3>
              <p>{error}</p>
            </div>
          )}
          
          {apiResponse && (
            <div className="p-4 bg-gray-50 rounded overflow-x-auto">
              <h3 className="font-bold mb-2">Response:</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}