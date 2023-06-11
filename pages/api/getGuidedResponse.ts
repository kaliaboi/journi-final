import {
  ChatGPTMessage,
  initialMessages,
  initialPrompt,
  openai,
} from "@/lib/opanai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages: ChatGPTMessage[] = [...initialMessages];

  if (req.method === "POST") {
    const messages: ChatGPTMessage[] = [initialPrompt, ...req.body.messages];
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    res.status(200).json({
      response: response.data.choices[0].message?.content,
    });
  }
}
