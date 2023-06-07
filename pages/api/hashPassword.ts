import { supabase } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

async function hashPassword(plaintextPassword: string) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

// compare password
async function comparePassword(plaintextPassword: string, hash: string) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { password } = req.body;
    const hash = await hashPassword(password);
    res.status(200).json({ hash });
  } else {
    // Handle any other HTTP method
  }
}
