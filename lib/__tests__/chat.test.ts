import { describe, it, expect, beforeEach } from "vitest";
import {
  getChatHistory,
  addMessage,
  clearChatHistory,
  sendMessageToAI,
} from "../chat";

describe("chat", () => {
  beforeEach(() => {
    clearChatHistory();
  });

  describe("addMessage", () => {
    it("should add a message to history", () => {
      const message = addMessage("Hello", "user");

      expect(message).toHaveProperty("id");
      expect(message).toHaveProperty("content", "Hello");
      expect(message).toHaveProperty("role", "user");
      expect(message).toHaveProperty("timestamp");

      const history = getChatHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(message);
    });
  });

  describe("getChatHistory", () => {
    it("should return empty array initially", () => {
      const history = getChatHistory();
      expect(history).toEqual([]);
    });

    it("should return all messages", () => {
      addMessage("First", "user");
      addMessage("Second", "assistant");

      const history = getChatHistory();
      expect(history).toHaveLength(2);
    });
  });

  describe("clearChatHistory", () => {
    it("should clear all messages", () => {
      addMessage("Test", "user");
      expect(getChatHistory()).toHaveLength(1);

      clearChatHistory();
      expect(getChatHistory()).toHaveLength(0);
    });
  });

  describe("sendMessageToAI", () => {
    it("should return a response", async () => {
      const response = await sendMessageToAI("Hello AI");
      expect(typeof response).toBe("string");
      expect(response.length).toBeGreaterThan(0);
    });
  });
});
