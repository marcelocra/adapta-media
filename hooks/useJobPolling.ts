import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/utils";

interface UseJobPollingOptions {
  recordId: string;
  targetStatus: string;
  intervalMs?: number;
  enabled?: boolean;
}

interface JobPollingResult {
  isPolling: boolean;
  isComplete: boolean;
  error: string | null;
  data: any;
}

export function useJobPolling({
  recordId,
  targetStatus,
  intervalMs = 3000,
  enabled = true,
}: UseJobPollingOptions): JobPollingResult {
  const [isPolling, setIsPolling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  };

  const checkStatus = async () => {
    try {
      const response = await fetch(`http://${API_URL}/display/${recordId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

      if (result.status === targetStatus) {
        setIsComplete(true);
        stopPolling();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      stopPolling();
    }
  };

  const startPolling = () => {
    if (!enabled || !recordId || isComplete) return;

    setIsPolling(true);
    setError(null);

    checkStatus();

    intervalRef.current = setInterval(checkStatus, intervalMs);
  };

  useEffect(() => {
    if (enabled && recordId && !isComplete) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [recordId, targetStatus, intervalMs, enabled, isComplete]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return {
    isPolling,
    isComplete,
    error,
    data,
  };
}
