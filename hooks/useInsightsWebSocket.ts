import { useEffect, useRef, useState, useCallback } from "react";
import { API_URL } from "@/lib/utils";

interface UseInsightsWebSocketOptions {
  recordId: string;
  enabled?: boolean;
}

interface InsightsWebSocketResult {
  isStreaming: boolean;
  isComplete: boolean;
  error: string | null;
  streamingContent: string;
  fullContent: string;
}

export function useInsightsWebSocket({
  recordId,
  enabled = true,
}: UseInsightsWebSocketOptions): InsightsWebSocketResult {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (!enabled || !recordId || wsRef.current) return;

    try {
      const ws = new WebSocket(`ws://${API_URL}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected for insights streaming");
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("WebSocket message received:", message);

          // Only process messages for the current record
          if (message.record_id === recordId) {
            console.log("Processing message for current record:", recordId);
            switch (message.type) {
              case "insights_stream":
                console.log("Insights stream chunk received");
                setIsStreaming(true);
                setStreamingContent(message.full_content);
                break;

              case "insights_completed":
                console.log("Insights completed");
                setIsComplete(true);
                setIsStreaming(false);
                setFullContent(message.full_content);
                setStreamingContent(message.full_content);
                break;
            }
          } else {
            console.log(
              "Message for different record, ignoring:",
              message.record_id,
              "vs",
              recordId,
            );
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket connection error");
        setIsStreaming(false);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setIsStreaming(false);
        wsRef.current = null;
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [enabled, recordId]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // Reset state when recordId changes
  useEffect(() => {
    setStreamingContent("");
    setFullContent("");
    setIsComplete(false);
    setError(null);

    disconnect();

    if (enabled && recordId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [recordId, enabled, connect, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isStreaming,
    isComplete,
    error,
    streamingContent,
    fullContent,
  };
}
