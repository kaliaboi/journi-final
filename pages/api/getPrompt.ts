import { ChatGPTMessage, initialMessages, openai } from "@/lib/opanai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages: ChatGPTMessage[] = [
    ...initialMessages,
    {
      role: "user",
      content: "give me a journaling prompt in the format prompt=[prompt]",
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  res.status(200).json({
    prompt: response.data.choices[0].message?.content.split("=")[1],
  });
}
