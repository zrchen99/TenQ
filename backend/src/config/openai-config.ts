// Used to configure OpenAI API
import { Configuration } from "openai";

export const configureOpenAI = () => {
  const openaiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
  });
  return openaiConfig;
};