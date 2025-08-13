"use client";
import { useEffect, useState } from 'react';

const HealthCheck = () => {
  const [status, setStatus] = useState({
    frontend: 'OK',
    apiUrl: '',
    environment: '',
  });

  useEffect(() => {
    setStatus({
      frontend: 'OK',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
      environment: process.env.NODE_ENV || '',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Health Check</h1>
      <div className="space-y-2">
        <p><strong>Frontend:</strong> {status.frontend}</p>
        <p><strong>API URL:</strong> {status.apiUrl}</p>
        <p><strong>Environment:</strong> {status.environment}</p>
        <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
      </div>
    </div>
  );
};

export default HealthCheck;