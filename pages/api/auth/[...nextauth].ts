import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Log the current environment for debugging
    console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);
    console.log(`Request URL: ${req.headers.host}${req.url}`);
    
    const authOptions = getAuthOptions(req, res);
    return await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("NextAuth error:", error);
    // Return a more helpful error for debugging purposes
    res.status(500).json({ 
      error: "Internal authentication error", 
      details: error instanceof Error ? error.message : String(error),
      hint: "Check that NEXTAUTH_URL is set correctly and the auth server is accessible"
    });
  }
}
