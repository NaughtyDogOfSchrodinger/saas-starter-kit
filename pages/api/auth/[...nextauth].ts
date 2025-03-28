import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authOptions = getAuthOptions(req, res);
    return await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("NextAuth error:", error);
    res.status(500).json({ error: "Internal authentication error" });
  }
}
