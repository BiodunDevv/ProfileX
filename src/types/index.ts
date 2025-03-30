/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  _id?: string;  // MongoDB uses _id
  id?: string;   // Add id field for compatibility
  name: string;
  email: string;
  verified: boolean;
  createdAt?: string;
};