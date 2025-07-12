import type { ChatMessage } from "@/types";

let messageHistory: ChatMessage[] = [];

export function getChatHistory(): ChatMessage[] {
  return messageHistory;
}

export function addMessage(
  content: string,
  role: "user" | "assistant",
): ChatMessage {
  const message: ChatMessage = {
    id: Date.now().toString(),
    content,
    role,
    timestamp: new Date(),
  };

  messageHistory.push(message);
  return message;
}

export function clearChatHistory(): void {
  messageHistory = [];
}

export async function sendMessageToAI(userMessage: string): Promise<string> {
  // Simulate AI response with delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000),
  );

  // Mock AI responses based on content
  const responses = [
    "Based on your data analysis requirements, I can help you identify key performance indicators and trends in your advertising campaigns.",
    "The metrics show strong performance in click-through rates. Would you like me to break down the conversion funnel?",
    "I notice some interesting patterns in your campaign data. Let me provide some actionable insights.",
    "Your advertising spend efficiency could be optimized. Here are some recommendations based on the current data.",
    "The seasonal trends in your campaigns suggest opportunities for budget reallocation. Would you like a detailed analysis?",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
