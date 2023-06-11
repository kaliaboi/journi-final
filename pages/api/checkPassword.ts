import { supabase } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

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
    const { password, hash } = req.body;
    const check = await comparePassword(password, hash);
    res.status(200).json({ result: check });
  } else {
    // Handle any other HTTP method
  }
}
