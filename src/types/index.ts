/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  _id?: string;  // MongoDB uses _id
  id?: string;   // Add id field for compatibility
  name: string;
  email: string;
  verified: boolean;
  role?: 'student' | 'teacher' | 'chef' | null;
  details?: Record<string, any>;
  createdAt?: string;
};