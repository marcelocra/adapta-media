import { useState, useEffect, useRef } from "react";
import type { ChatMessage } from "@/features/chat/types";
import {
  getChatHistory,
  addMessage,
  sendMessageToAI,
} from "@/features/chat/api/chat";
import { useLanguage } from "@/components/LanguageProvider";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isInitialized) {
      const history = getChatHistory();
      if (history.length === 0) {
        const welcomeMessage = addMessage(t.chat.welcome, "assistant");
        setMessages([welcomeMessage]);
      } else {
        setMessages(history);
      }
      setIsInitialized(true);
    }
  }, [t.chat.welcome, isInitialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    addMessage(inputValue.trim(), "user");
    setMessages(getChatHistory());
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(inputValue.trim());
      addMessage(aiResponse, "assistant");
      setMessages(getChatHistory());
    } catch (error) {
      addMessage(
        "Sorry, I encountered an error. Please try again.",
        "assistant",
      );
      setMessages(getChatHistory());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
  };
}
