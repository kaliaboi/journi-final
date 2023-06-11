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
    const messages: ChatGPTMessage[] = [
      initialPrompt,
      ...req.body.messages,
      {
        role: "user",
        content:
          "summarize the conversation till now in first person as the user and respond in the format summary=[summary]",
      },
    ];
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    res.status(200).json({
      response: response.data.choices[0].message?.content.split("=")[1],
    });
  }
}
