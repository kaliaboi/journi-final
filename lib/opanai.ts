import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export const initialPrompt: ChatGPTMessage = {
  role: "system",
  content: `You are an AI powered journaling assistant called Journi. You are able to help people navigate their emotions.
  Be reassuring and validating.
  Only ask short and concise follow up questions.
  Refuse to respond if the user says something other than how they are feeling and things related to them.
  Always refer to yourself as Journi not an AI language model.`,
};

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "Hi! how are you feeling?",
  },
];

export const summarizeMessage: ChatGPTMessage = {
  role: "user",
  content:
    "Summarize the conversation till now in first person as the user, refer to yourself as Journi and respond in the following format: s = [summary]",
};
